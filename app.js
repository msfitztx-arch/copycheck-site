/* Copy Check web interface. All checking runs locally through engine.js. */
(function(){
 'use strict';
 var current=null,selectedTab='flags',captionFormats={},captionPhotoCounts={},snapshot=null;
 var $=function(id){return document.getElementById(id);};
 var editor=$('editor');
 var escape=function(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
 var styles=[['ABCD','Standard · ABCD'],['ABC','ABC'],['BC','BC'],['ACD','ACD'],['AB','Summary · AB'],['GROUP','Group caption'],['IDENT','Photo ident'],['GROUP_IDENT','Group ident'],['QUOTE','Quote caption']];
 var categories={caption:'Caption format',grammar:'Grammar',house:'Staff style',structure:'LQTQ',verify:'Verify reference'};
 var highlightsSupported=typeof CSS!=='undefined'&&CSS.highlights&&typeof Highlight!=='undefined';
 function styleOptions(value){return styles.map(function(s){return '<option value="'+s[0]+'"'+(value===s[0]?' selected':'')+'>'+s[1]+'</option>';}).join('');}

 // ---- Reading the editor -------------------------------------------------
 var BLOCK=/^(P|DIV|LI|UL|OL|H[1-6]|BLOCKQUOTE|PRE|TABLE|THEAD|TBODY|TFOOT|TR|TD|TH|SECTION|ARTICLE|HEADER|FOOTER|DL|DT|DD|FIGURE|FIGCAPTION|CENTER|ADDRESS)$/;
 var SKIP=/^(SCRIPT|STYLE|HEAD|TITLE|META|LINK|NOSCRIPT|TEMPLATE|IMG|SVG|OBJECT|IFRAME|XML)$/;
 function kindOf(el,parentKind){
  if(/^H[1-6]$/.test(el.tagName)||el.dataset&&el.dataset.kind==='heading')return 'heading';
  if(/^(TABLE|TD|TH|TR)$/.test(el.tagName)||el.dataset&&el.dataset.kind==='table')return 'table';
  return parentKind;
 }
 // Splits a DOM tree into lines (paragraphs) of text runs, recording bold state per run.
 function readLines(root,isBold,collapse){
  var lines=[],cur=null,tables=0;
  function open(kind){cur={kind:kind,runs:[]};lines.push(cur);}
  function walk(node,kind){
   for(var child=node.firstChild;child;child=child.nextSibling){
    if(child.nodeType===3){
     var value=child.nodeValue;
     if(collapse)value=value.replace(/[\s ]+/g,function(s){return s.indexOf(' ')!==-1&&!/\S/.test(s)?' ':' ';});
     if(!cur){if(!/[^\s]/.test(value.replace(/ /g,'x')))continue;open(kind);}
     if(value.length)cur.runs.push({node:child,text:value.replace(/[\n\r\t ]/g,' '),bold:isBold(child)});
    }else if(child.nodeType===1){
     var tag=child.tagName;
     if(SKIP.test(tag))continue;
     if(tag==='BR'){if(cur&&cur.runs.length)cur=null;else{lines.push({kind:kind,runs:[]});cur=null;}continue;}
     var k=kindOf(child,kind);
     if(tag==='TABLE')tables++;
     if(BLOCK.test(tag)){cur=null;if(!/^(TABLE|THEAD|TBODY|TFOOT|TR|UL|OL|DL)$/.test(tag))open(k);walk(child,k);cur=null;}
     else walk(child,k);
    }
   }
  }
  walk(root,'p');
  return {lines:lines,tables:tables};
 }
 function computedBold(node){var el=node.parentElement;if(!el)return false;var w=getComputedStyle(el).fontWeight;return w==='bold'||w==='bolder'||parseInt(w,10)>=600;}
 function sourceBold(node){
  for(var el=node.parentElement;el&&el.tagName!=='BODY';el=el.parentElement){
   var w=el.style&&el.style.fontWeight;
   if(w)return w==='bold'||w==='bolder'||parseInt(w,10)>=600;
   if(el.tagName==='B'||el.tagName==='STRONG')return true;
  }
  return false;
 }
 function leadingBold(runs,text,hasBold){
  if(!hasBold)return null;
  var first=text.search(/\S/),end=first,pos=0;
  if(first<0)return null;
  for(var i=0;i<runs.length;i++){
   var r=runs[i],s=pos,e=pos+r.text.length;pos=e;
   if(e<=first)continue;
   if(!r.bold){if(!/\S/.test(r.text))continue;break;}
   end=e;
  }
  return {known:true,text:text.slice(first,end).trimEnd(),start:first,end:Math.max(first,end)};
 }
 function readEditor(options){
  var read=readLines(editor,computedBold,false),text='',paragraphs=[],runs=[],skippedHeadings=0,skippedTables=0,breakNext=true;
  var hasBold=read.lines.some(function(l){return l.runs.some(function(r){return r.bold&&/\S/.test(r.text);});});
  var tableSeen=false;
  read.lines.forEach(function(line){
   var local=line.runs.map(function(r){return r.text;}).join('');
   if(line.kind==='heading'&&!options.includeHeadings){if(local.trim())skippedHeadings++;breakNext=true;return;}
   if(line.kind==='table'&&!options.includeTables){if(local.trim()&&!tableSeen){skippedTables++;tableSeen=true;}return;}
   if(line.kind!=='table')tableSeen=false;
   if(!local.trim()){breakNext=true;return;}
   if(paragraphs.length)text+='\n\n';
   var start=text.length,pos=start;text+=local;
   if(text.length>50000)throw new Error('This copy is over 50,000 characters. Check one story or caption set at a time.');
   paragraphs.push({text:local,start:start,end:text.length,index:paragraphs.length,leadingBold:leadingBold(line.runs,local,hasBold),breakBefore:breakNext});
   breakNext=false;
   if(paragraphs.length>500)throw new Error('Check one draft at a time, up to 500 nonempty paragraphs.');
   line.runs.forEach(function(r){runs.push({node:r.node,start:pos,end:pos+r.text.length});pos+=r.text.length;});
  });
  return {text:text,paragraphs:paragraphs,runs:runs,skippedHeadings:skippedHeadings,skippedTables:skippedTables};
 }

 // ---- Pasting --------------------------------------------------------------
 function linesToHtml(lines){
  return lines.map(function(line){
   var body=line.runs.map(function(r){var t=escape(r.text);return r.bold&&/\S/.test(r.text)?'<strong>'+t+'</strong>':t;}).join('');
   if(!line.runs.some(function(r){return /\S/.test(r.text);}))return '<p><br></p>';
   if(line.kind==='heading')return '<h3>'+body+'</h3>';
   if(line.kind==='table')return '<p class="cell" data-kind="table">'+body+'</p>';
   return '<p>'+body+'</p>';
  }).join('');
 }
 function plainToHtml(text){return text.replace(/\r\n?/g,'\n').split('\n').map(function(line){return line.trim()?'<p>'+escape(line)+'</p>':'<p><br></p>';}).join('');}
 function insertHtml(html){
  editor.focus();
  if(!document.execCommand||!document.execCommand('insertHTML',false,html)){
   var sel=window.getSelection(),range=sel.rangeCount?sel.getRangeAt(0):null;
   if(!range||!editor.contains(range.commonAncestorContainer)){range=document.createRange();range.selectNodeContents(editor);range.collapse(false);}
   range.deleteContents();var frag=range.createContextualFragment(html),last=frag.lastChild;range.insertNode(frag);
   if(last){range.setStartAfter(last);range.collapse(true);sel.removeAllRanges();sel.addRange(range);}
  }
 }
 editor.addEventListener('paste',function(e){
  var data=e.clipboardData;if(!data)return;
  e.preventDefault();
  var html=data.getData('text/html'),plain=data.getData('text/plain');
  if(html){
   var doc=new DOMParser().parseFromString(html,'text/html');
   var lines=readLines(doc.body,sourceBold,true).lines;
   while(lines.length&&!lines[0].runs.some(function(r){return /\S/.test(r.text);}))lines.shift();
   while(lines.length&&!lines[lines.length-1].runs.some(function(r){return /\S/.test(r.text);}))lines.pop();
   insertHtml(lines.length?linesToHtml(lines):plainToHtml(plain));
  }else insertHtml(plainToHtml(plain));
 });
 editor.addEventListener('drop',function(e){e.preventDefault();});
 try{document.execCommand('defaultParagraphSeparator',false,'p');}catch(err){}

 // ---- Highlights -------------------------------------------------------------
 function rangeFor(start,end){
  if(!snapshot)return null;
  var a=null,b=null;
  for(var i=0;i<snapshot.runs.length;i++){var r=snapshot.runs[i];if(!a&&start>=r.start&&start<r.end)a=r;if(end>r.start&&end<=r.end){b=r;break;}}
  if(!a||!b||!editor.contains(a.node)||!editor.contains(b.node))return null;
  var range=document.createRange();
  try{range.setStart(a.node,start-a.start);range.setEnd(b.node,end-b.start);}catch(err){return null;}
  return range;
 }
 function clearHighlights(){if(highlightsSupported){CSS.highlights.delete('copy-flag');CSS.highlights.delete('copy-active');}}
 function paintAll(){
  if(!highlightsSupported||!current)return;
  var ranges=current.findings.filter(function(f){return f.end-f.start<400;}).map(function(f){return rangeFor(f.start,f.end);}).filter(Boolean);
  CSS.highlights.set('copy-flag',new (Function.prototype.bind.apply(Highlight,[null].concat(ranges)))());
 }
 function showRange(start,end){
  var range=rangeFor(start,end);
  if(!range){status('That passage can’t be found any more. Run the check again.',true);return;}
  var el=range.startContainer.parentElement;
  if(el&&el.scrollIntoView)el.scrollIntoView({block:'center',behavior:'smooth'});
  if(highlightsSupported)CSS.highlights.set('copy-active',new Highlight(range));
  var sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
  status('Passage highlighted in your copy.');
 }

 // ---- Results ----------------------------------------------------------------
 function status(message,error){$('status').textContent=message;$('status').hidden=!message;$('status').className='status'+(error?' error':'');}
 function source(f){return escape(f.category==='grammar'?'Grammar · Purdue OWL':f.category==='structure'?'Staff LQTQ format':f.category==='caption'?'2027 Caption Guide':'2027 Staff Style Guide')+(f.section?' · '+escape(f.section):'');}
 function showButton(attr,value){return '<button type="button" class="locate" '+attr+'="'+escape(value)+'"'+(current.stale?' disabled':'')+'>Show in text ↗</button>';}
 function renderFlags(){
  if(!current)return;
  var filter=$('filter').value,list=current.findings.filter(function(f){return filter==='all'||filter==='quotes'&&f.inQuote||f.category===filter;});
  $('flags-list').innerHTML=list.length?list.map(function(f){return '<article class="card '+escape(f.category)+'"><div class="meta"><span>'+escape(categories[f.category])+'</span><span>'+(f.caption?'CAP '+f.caption+' / ':'')+'PARA '+f.paragraph+'</span></div>'+(f.inQuote?'<span class="quote">QUOTED PASSAGE · VERIFICATION NEEDED</span>':'')+'<h3>'+escape(f.title)+'</h3><div class="excerpt">'+escape(f.excerpt)+(f.truncated?'…':'')+'</div><p class="reason">'+escape(f.reason)+'</p><p class="source">'+source(f)+(f.possible?' · Possible issue':'')+'</p>'+showButton('data-show',f.id)+'</article>';}).join(''):'<div class="empty small-empty"><h2>No flags in this view.</h2><p>A first pass can miss errors. This result isn’t approval to publish.</p></div>';
 }
 function renderMap(){
  if(current.options.mode==='caption'){
   $('map-list').innerHTML='<p class="note">A: action lead-in · B: basic photo info · C: complementary info · D: direct quote. Detection is approximate. Photo meaning, factual accuracy and whether a speaker appears in the photo aren’t verified.</p><p class="note">Choices follow caption order. Reset them after adding, deleting or reordering captions.</p><button type="button" class="locate" id="reset-caption-styles">Reset per-caption styles</button>'+(current.captionMap||[]).map(function(p){return '<article class="para"><div class="para-top"><strong>CAPTION '+p.index+'</strong></div><label class="field-label" for="style-'+p.index+'">EXPECTED STYLE</label><select id="style-'+p.index+'" data-caption-style="'+p.index+'">'+styleOptions(p.format)+'</select>'+(p.format==='GROUP'?'<label class="field-label" for="photos-'+p.index+'">PHOTO COUNT (IF KNOWN)</label><input type="number" min="1" max="20" id="photos-'+p.index+'" data-photo-count="'+p.index+'" value="'+(p.photoCount||'')+'" placeholder="Unknown">':'')+'<p>'+escape(p.excerpt)+(p.end-p.start>180?'…':'')+'</p>'+(p.components&&p.components.length?'<p class="reason">'+p.components.map(function(part){return part.letter+': '+(part.detected?'detected':'not identified');}).join(' · ')+'</p>':'')+(p.notes||[]).map(function(note){return '<p class="note">'+escape(note)+'</p>';}).join('')+showButton('data-caption',p.index)+'</article>';}).join('');
   return;
  }
  $('map-list').innerHTML=current.map.map(function(p){return '<article class="para"><div class="para-top"><span>PARAGRAPH '+p.index+'</span><strong>'+escape(p.role)+'</strong></div><p>'+escape(p.excerpt)+(p.end-p.start>180?'…':'')+'</p>'+showButton('data-paragraph',p.index)+'</article>';}).join('');
 }
 function tab(name){selectedTab=name;['flags','map'].forEach(function(id){$(id+'-panel').hidden=id!==name;$(id+'-tab').setAttribute('aria-selected',String(id===name));$(id+'-tab').tabIndex=id===name?0:-1;});}
 function options(){
  return {mode:$('mode').value==='caption'?'caption':'story',includeHeadings:$('headings').checked,includeTables:$('tables').checked,people:$('people').value,captionFormat:$('caption-format').value,captionLayout:$('caption-layout').value==='blank'?'blank':'paragraph',captionFormats:captionFormats,captionPhotoCounts:captionPhotoCounts};
 }
 function runCheck(){
  try{
   var opts=options();
   snapshot=readEditor(opts);
   if(!snapshot.text.trim()){current=null;clearHighlights();$('results').hidden=true;$('empty').hidden=false;status('Paste or type some copy first.',true);return;}
   var people=parsePeople_(opts.people);
   var result=diagnoseText_(snapshot.text,{mode:opts.mode,paragraphs:snapshot.paragraphs,people:people.people,captionFormat:opts.captionFormat,captionFormats:opts.captionFormats,captionPhotoCounts:opts.captionPhotoCounts,captionLayout:opts.captionLayout});
   var findings=result.findings.map(function(f){return {id:f.id,ruleId:f.ruleId,start:f.start,end:f.end,excerpt:f.excerpt.slice(0,180),truncated:f.excerpt.length>180,title:f.title,reason:f.reason,category:f.category,section:f.section,possible:f.possible,inQuote:f.inQuote,paragraph:f.paragraph,caption:f.caption||null};});
   current={options:opts,findings:findings,map:result.map,captionMap:result.captionMap,stats:result.stats,limited:result.limited,stale:false};
   $('empty').hidden=true;$('results').hidden=false;
   var count=findings.length;
   $('summary').innerHTML='<div class="summary-top"><div class="number">'+count+'</div><div><strong>flagged '+(count===1?'passage':'passages')+'</strong><span>'+result.stats.words+' words · '+result.stats.paragraphs+' paragraphs'+(opts.mode==='caption'?' · '+result.stats.captionCount+' captions':'')+'</span></div></div><p>Flags include possible issues that need context.</p>';
   $('map-tab').textContent=opts.mode==='caption'?'Caption formats':'LQTQ map';
   $('map-note').textContent=opts.mode==='caption'?'Choose the expected style for each caption. Results refresh when you change one.':'Detected paragraph roles. Quotation marks and position determine these labels; meaning and flow aren’t verified.';
   renderFlags();renderMap();tab(selectedTab);clearHighlights();paintAll();
   var notes=people.errors.slice();
   if(result.limited)notes.push('Only the first 500 flags are shown.');
   if(snapshot.skippedHeadings)notes.push(snapshot.skippedHeadings+' heading/title paragraphs excluded.');
   if(snapshot.skippedTables)notes.push(snapshot.skippedTables+' table(s) excluded.');
   status((count?'Check complete.':'No selected error patterns were flagged.')+(notes.length?' '+notes.join(' '):''));
  }catch(error){status(error&&error.message?error.message:'The check couldn’t finish. Try again.',true);}
 }
 function invalidate(message){
  if(!current)return;
  current=null;clearHighlights();$('results').hidden=true;$('empty').hidden=false;status(message||'Settings changed. Run the check again with the new settings.');
 }

 // ---- Events ---------------------------------------------------------------
 $('caption-format').innerHTML=styleOptions('ABCD');
 function syncMode(){var caption=$('mode').value==='caption';document.querySelectorAll('.caption-only').forEach(function(el){el.hidden=!caption;});}
 $('check').addEventListener('click',runCheck);
 $('mode').addEventListener('change',function(){syncMode();captionFormats={};captionPhotoCounts={};invalidate();});
 ['caption-format','caption-layout'].forEach(function(id){$(id).addEventListener('change',function(){captionFormats={};captionPhotoCounts={};invalidate();});});
 ['headings','tables','people'].forEach(function(id){$(id).addEventListener('change',function(){invalidate();});});
 $('filter').addEventListener('change',renderFlags);
 document.addEventListener('change',function(e){
  if(e.target.matches('[data-caption-style]')){captionFormats[e.target.dataset.captionStyle]=e.target.value;runCheck();}
  if(e.target.matches('[data-photo-count]')){var n=Number(e.target.value);if(n>=1&&n<=20&&Number.isInteger(n))captionPhotoCounts[e.target.dataset.photoCount]=n;else delete captionPhotoCounts[e.target.dataset.photoCount];runCheck();}
 });
 document.addEventListener('click',function(e){
  var target=e.target.closest('[data-tab],[data-show],[data-paragraph],[data-caption],#reset-caption-styles');if(!target)return;
  if(target.id==='reset-caption-styles'){captionFormats={};captionPhotoCounts={};runCheck();return;}
  if(target.dataset.tab){tab(target.dataset.tab);return;}
  if(!current||current.stale)return;
  var item=target.dataset.show?current.findings.find(function(f){return f.id===target.dataset.show;}):target.dataset.caption?(current.captionMap||[]).find(function(p){return p.index===Number(target.dataset.caption);}):current.map.find(function(p){return p.index===Number(target.dataset.paragraph);});
  if(item)showRange(item.start,item.end);
 });
 document.querySelector('.tabs').addEventListener('keydown',function(e){if(['ArrowLeft','ArrowRight','Home','End'].indexOf(e.key)===-1)return;e.preventDefault();tab(e.key==='Home'?'flags':e.key==='End'?'map':selectedTab==='flags'?'map':'flags');$(selectedTab+'-tab').focus();});

 var countTimer=null;
 function updateCount(){var words=(editor.innerText.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu)||[]).length;$('counter').textContent=words+(words===1?' word':' words');editor.classList.toggle('is-empty',!editor.textContent.trim());}
 editor.addEventListener('input',function(){
  if(current&&!current.stale){current.stale=true;clearHighlights();document.querySelectorAll('.results-panel .locate:not(#reset-caption-styles)').forEach(function(b){b.disabled=true;});status('Your copy changed. Run the check again for current results and locations.');}
  clearTimeout(countTimer);countTimer=setTimeout(updateCount,150);
 });

 var samples={
  story:'<p>Before the curtain rose Oct. 15, senior Maya Chen tested eight stage lights. The crew had worked for over 3 weeks, and the extra time was really worth it.</p><p>“I checked every cue,” Maya said. “The cast trusted the lights.”</p><p>The crew also replaced two cables the night before. They is still learning the new board; band director Paul Reyes helped them.</p><p>“We was nervous at first,” said Reyes. “By opening night the the board felt easy.”</p>',
  caption:'<p><strong>Last-second save</strong> Diving to her left, sophomore Maya Chen blocked a penalty kick. The team held on to win 2-1. “I watched the ball,” Maya said. “The save felt different.”</p><p>Sofia Ramirez (12)</p><p><strong>Front row</strong> Pictured left to right are the varsity singers before the spring concert. What a night!</p>'
 };
 $('sample').addEventListener('click',function(){editor.innerHTML=samples[$('mode').value==='caption'?'caption':'story'];editor.dispatchEvent(new Event('input'));updateCount();runCheck();});
 $('clear').addEventListener('click',function(){editor.innerHTML='';clearHighlights();current=null;snapshot=null;$('results').hidden=true;$('empty').hidden=false;status('');updateCount();editor.focus();});

 // ---- Rule reference -------------------------------------------------------
 if(typeof DIAGNOSTIC_RULES_!=='undefined'){
  document.querySelectorAll('.rule-list').forEach(function(box){
   var seen={},rules=DIAGNOSTIC_RULES_.filter(function(r){var key=r.title+'|'+r.reason;if(r.category!==box.dataset.category||seen[key])return false;seen[key]=true;return true;});
   box.innerHTML='<ul>'+rules.map(function(r){return '<li><strong>'+escape(r.title)+(r.possible?' <span class="pill">possible</span>':'')+'</strong>'+escape(r.reason)+(r.section?' <em>'+escape(r.section)+'</em>':'')+'</li>';}).join('')+'</ul>';
  });
 }
 syncMode();updateCount();
})();
