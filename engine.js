/**
 * Copy Desk web — diagnostics engine. Runs entirely in the browser; makes no network requests.
 * Copy Desk — diagnostics only. No document rewrites or replacement suggestions.
 * Generated from the included diagnostic rules.
 */
var DIAGNOSTIC_RULES_ = [
  {id:"duplicate-word",category:"grammar",pattern:new RegExp("\\b([A-Za-z]+)([ \\t]+)\\1\\b","gi"),title:"Repeated word",reason:"Adjacent repeated wording may be accidental.",section:"",possible:true},
  {id:"plural-agreement",category:"grammar",pattern:new RegExp("\\b(they|we|you)\\s+(is|was|has|does)\\b","gi"),title:"Possible subject–verb agreement error",reason:"The pronoun and verb appear to differ in number or person.",section:"",possible:true},
  {id:"singular-agreement",category:"grammar",pattern:new RegExp("\\b(he|she|it)\\s+(are|were|have|do)\\b","gi"),title:"Possible subject–verb agreement error",reason:"The subject and verb may differ in number. Hypothetical clauses require context.",section:"",possible:true},
  {id:"i-agreement",category:"grammar",pattern:new RegExp("\\bI\\s+(is|are|has)\\b","g"),title:"Possible verb-form error",reason:"The verb form does not appear to agree with this subject.",section:"",possible:true},
  {id:"plural-noun-agreement",category:"grammar",pattern:new RegExp("\\b(students|players|members|teachers|volunteers)\\s+(is|was|has)\\b","gi"),title:"Possible plural subject–verb mismatch",reason:"The plural noun and verb appear to differ in number.",section:"",possible:true},
  {id:"negative-agreement",category:"grammar",pattern:new RegExp("\\b(he|she|it)\\s+don['’]t\\b","gi"),title:"Possible negative-verb agreement error",reason:"The subject and negative auxiliary may not agree.",section:"",possible:true},
  {id:"could-of",category:"grammar",pattern:new RegExp("\\b(could|would|should|might|must)\\s+of\\b","gi"),title:"Possible auxiliary-verb error",reason:"The word following the modal is not functioning as the expected auxiliary verb.",section:"",possible:false},
  {id:"their-are",category:"grammar",pattern:new RegExp("\\btheir\\s+(is|are|was|were)\\b","gi"),title:"Possible homophone error",reason:"This possessive form appears before a verb where an introductory form may be intended.",section:"",possible:true},
  {id:"your-youre",category:"grammar",pattern:new RegExp("\\byour\\s+(welcome|going|doing|trying|looking|ready)\\b","gi"),title:"Possible possessive/contraction confusion",reason:"The possessive form may be inconsistent with the following predicate.",section:"",possible:true},
  {id:"its-it-is",category:"grammar",pattern:new RegExp("\\bits\\s+(a|an|not|been|going)\\b","gi"),title:"Possible possessive/contraction confusion",reason:"The sentence may require a contraction rather than a possessive form.",section:"",possible:true},
  {id:"its-possession",category:"grammar",pattern:new RegExp("\\bit['’]s\\s+(own|roster|mascot|members|president)\\b","gi"),title:"Possible apostrophe error",reason:"The contraction may be inconsistent with the following possessive phrase.",section:"",possible:true},
  {id:"between-i",category:"grammar",pattern:new RegExp("\\bbetween you and I\\b","gi"),title:"Possible pronoun-case error",reason:"The pronoun after the preposition appears to have the wrong grammatical case.",section:"",possible:true},
  {id:"more-better",category:"grammar",pattern:new RegExp("\\bmore (better|easier|faster|stronger)\\b","gi"),title:"Double comparative",reason:"Two comparative markers appear in the same expression.",section:"",possible:true},
  {id:"less-count",category:"house",pattern:new RegExp("\\bless (?:than )?\\d+ (?:students|players|people|members|volunteers|tickets)\\b","gi"),title:"Count-word mismatch",reason:"The quantifier appears with countable plural items, contrary to the guide’s distinction.",section:"p. 3 · §7",possible:false},
  {id:"filler",category:"house",pattern:new RegExp("\\b(?:very|really|awesome|fun-filled|seems|feels)\\b","gi"),title:"Listed filler word",reason:"This word is on the publication’s prohibited filler list for staff-written copy.",section:"p. 4 · §9",possible:false},
  {id:"cliche",category:"house",pattern:new RegExp("\\b(?:all in all|in the end|became a family|bonded like sisters|to last a lifetime|you may not know|behind the scenes|hard work and dedication)\\b","gi"),title:"Listed cliché",reason:"This phrase is on the guide’s cliché list.",section:"p. 4 · §9",possible:false},
  {id:"year-reference",category:"house",pattern:new RegExp("\\b(?:this year|next year)\\b","gi"),title:"Unnecessary year reference",reason:"The guide identifies this relative year reference as unnecessary in a yearbook.",section:"p. 4 · §9",possible:false},
  {id:"congratulate",category:"house",pattern:new RegExp("\\bwe congratulate\\b","gi"),title:"Editorial voice in reporting",reason:"This phrase expresses congratulations in the staff’s voice, which the guide prohibits.",section:"p. 4 · §9",possible:false},
  {id:"everyone",category:"house",pattern:new RegExp("\\beveryone agreed\\b","gi"),title:"Unverified universal claim",reason:"The scope of this claim may exceed the reporting evidence.",section:"p. 4 · §9",possible:true},
  {id:"when-asked",category:"house",pattern:new RegExp("\\bwhen asked(?:,?\\s+(?:he|she|they) said)?\\b","gi"),title:"Interview-process wording",reason:"The guide identifies this interview-process phrase as unnecessary.",section:"p. 4 · §9",possible:false},
  {id:"many-students",category:"house",pattern:new RegExp("\\bmany students\\b","gi"),title:"Vague student reference",reason:"The guide identifies this unspecific group reference as a reporting problem.",section:"p. 4 · §9",possible:true},
  {id:"adviser",category:"house",pattern:new RegExp("\\badvisors?\\b","gi"),title:"Publication spelling mismatch",reason:"This role spelling differs from the staff guide.",section:"p. 3 · §7",possible:false},
  {id:"sophomore",category:"house",pattern:new RegExp("\\bsophmores?\\b","gi"),title:"Grade-word misspelling",reason:"This grade word appears to be misspelled.",section:"p. 3 · §7",possible:false},
  {id:"toward",category:"house",pattern:new RegExp("\\btowards\\b","gi"),title:"Publication word-form mismatch",reason:"This word form differs from the staff guide.",section:"p. 3 · §7",possible:false},
  {id:"off-of",category:"house",pattern:new RegExp("\\boff of\\b","gi"),title:"Publication phrase mismatch",reason:"This phrase differs from the staff guide.",section:"p. 3 · §7",possible:false},
  {id:"because-of",category:"house",pattern:new RegExp("\\bdue to\\b","gi"),title:"Publication phrase mismatch",reason:"This causal phrase differs from the staff guide.",section:"p. 3 · §7",possible:true},
  {id:"more-than",category:"house",pattern:new RegExp("\\bover (?=\\d)","gi"),title:"Possible quantity-word mismatch",reason:"For a numeric quantity, this word conflicts with the guide. A physical relationship may be different.",section:"p. 3 · §7",possible:true},
  {id:"one-act",category:"house",pattern:new RegExp("\\bone act play\\b","gi"),title:"Missing compound-word hyphen",reason:"The modifier’s hyphenation differs from the guide.",section:"p. 3 · §7",possible:false},
  {id:"honorific",category:"house",pattern:new RegExp("\\b(?:Mr|Mrs|Ms)\\.","g"),title:"Prohibited adult honorific",reason:"The guide does not permit this adult honorific.",section:"p. 1 · §2",possible:false},
  {id:"doctor",category:"verify",pattern:new RegExp("\\bDr\\.","g"),title:"Unverified credential",reason:"The title depends on a doctorate that the checker cannot verify.",section:"p. 1 · §2",possible:true},
  {id:"suffix-comma",category:"house",pattern:new RegExp("\\b([A-Z][A-Za-z’'-]+), (Jr\\.|Sr\\.)","g"),title:"Name-suffix punctuation mismatch",reason:"The comma before the suffix conflicts with the guide.",section:"p. 1 · §1",possible:false},
  {id:"caption-id-in-story",category:"house",pattern:new RegExp("\\b[A-Z][A-Za-z’'-]+(?: [A-Z][A-Za-z’'-]+)+\\s*\\((?:9|10|11|12)\\)","g"),title:"Caption-style ID in story copy",reason:"The parenthesized grade-number format is reserved for captions and photo IDs.",section:"p. 1 · §1",possible:true},
  {id:"homecoming",category:"house",pattern:new RegExp("\\bhomecoming\\b","g"),title:"Event capitalization mismatch",reason:"This event’s capitalization differs from the publication’s explicit rule.",section:"p. 2 · §5",possible:false},
  {id:"prom",category:"house",pattern:new RegExp("\\b(?:Prom|Pep Rally|Spring Break|Class of \\d{4})\\b","g"),title:"Possible event capitalization mismatch",reason:"This event or class reference is normally lowercase outside a sentence opening.",section:"p. 2 · §5",possible:true},
  {id:"grade-cap",category:"house",pattern:new RegExp("\\b(?:Freshman|Sophomore|Junior|Senior)\\s+[A-Z][A-Za-z’'-]+\\s+[A-Z][A-Za-z’'-]+","g"),title:"Grade-word capitalization mismatch",reason:"The grade word is capitalized away from a sentence opening.",section:"p. 1 · §1",possible:true},
  {id:"adult-title-caps",category:"house",pattern:new RegExp("\\b(?:Principal|Assistant Principal|Associate Principal|Head Coach|Assistant Coach|Band Director|Adviser|Sponsor|English Teacher)\\s+[A-Z][A-Za-z’'-]+","g"),title:"Adult-title capitalization mismatch",reason:"The adult title is capitalized away from a sentence opening.",section:"p. 1 · §2",possible:true},
  {id:"ordinal-date",category:"house",pattern:new RegExp("\\b((?:Jan(?:uary)?\\.?|Feb(?:ruary)?\\.?|Mar(?:ch)?\\.?|Apr(?:il)?\\.?|May|June?|July?|Aug(?:ust)?\\.?|Sept?(?:ember)?\\.?|Oct(?:ober)?\\.?|Nov(?:ember)?\\.?|Dec(?:ember)?\\.?)\\s+\\d{1,2})(?:st|nd|rd|th)\\b","gi"),title:"Calendar-date suffix mismatch",reason:"The ordinal ending conflicts with the guide’s calendar-date format.",section:"p. 2 · §4",possible:false},
  {id:"short-month",category:"house",pattern:new RegExp("\\b(?:January|February|August|September|October|November|December)(?=\\s+\\d{1,2}\\b)","g"),title:"Month abbreviation mismatch",reason:"With a specific day, this month’s form differs from the guide.",section:"p. 2 · §4",possible:false},
  {id:"long-month",category:"house",pattern:new RegExp("\\b(?:Mar\\.|Apr\\.|Jun\\.|Jul\\.)(?=\\s+\\d)","g"),title:"Month abbreviation mismatch",reason:"This month is shortened even though the guide requires its full form.",section:"p. 2 · §4",possible:false},
  {id:"weekday",category:"house",pattern:new RegExp("\\b(?:Mon\\.|Tues?\\.|Wed\\.|Thu(?:rs)?\\.|Fri\\.|Sat\\.|Sun\\.)","g"),title:"Weekday abbreviation mismatch",reason:"This weekday is abbreviated, contrary to the guide.",section:"p. 2 · §4",possible:false},
  {id:"time-style",category:"house",pattern:new RegExp("\\b(\\d{1,2})(?::(\\d{2}))?\\s*(AM|PM|am|pm|A\\.M\\.|P\\.M\\.)(?![A-Za-z])\\.?","g"),title:"Time-format mismatch",reason:"The capitalization, punctuation or minute format differs from the guide.",section:"p. 2 · §3",possible:false},
  {id:"exact-hour",category:"house",pattern:new RegExp("\\b(\\d{1,2}):00\\s+(a\\.m\\.|p\\.m\\.)","gi"),title:"Redundant exact-hour minutes",reason:"The minute digits on this exact hour conflict with the guide’s time format.",section:"p. 2 · §3",possible:false},
  {id:"noon-midnight",category:"house",pattern:new RegExp("\\b12\\s+(a\\.m\\.|p\\.m\\.)","gi"),title:"Ambiguous noon/midnight notation",reason:"This numeric time expression conflicts with the guide’s noon/midnight rule.",section:"p. 2 · §3",possible:false},
  {id:"money",category:"house",pattern:new RegExp("\\$(\\d[\\d,]*)\\.00\\b","g"),title:"Redundant money decimals",reason:"The whole-dollar amount includes decimals the guide omits.",section:"p. 2 · §3",possible:false},
  {id:"percent",category:"house",pattern:new RegExp("\\b(\\d+(?:\\.\\d+)?)\\s+percent\\b","gi"),title:"Percentage-format mismatch",reason:"The percentage notation differs from the guide.",section:"p. 2 · §3",possible:false},
  {id:"word-age",category:"house",pattern:new RegExp("\\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen)([ -])(?=(?:years? old|year-old))","gi"),title:"Age-number format mismatch",reason:"The age is spelled out, contrary to the guide’s age exception.",section:"p. 2 · §3",possible:false},
  {id:"decade",category:"house",pattern:new RegExp("\\b((?:18|19|20)\\d0)['’]s\\b","g"),title:"Decade apostrophe mismatch",reason:"The apostrophe appears in a full four-digit decade plural.",section:"p. 2 · §3",possible:false},
  {id:"sports-possessive",category:"house",pattern:new RegExp("\\b(boys|girls)['’]\\s+(basketball|soccer|volleyball|tennis|golf|track|cross country)\\b","gi"),title:"Team-name apostrophe mismatch",reason:"The apostrophe in this team name conflicts with the guide.",section:"p. 4 · §8",possible:false},
  {id:"sports-caps",category:"house",pattern:new RegExp("\\b(?:Varsity|Junior Varsity)\\s+(?:Boys|Girls|boys|girls)\\s+(?:Basketball|Soccer|Volleyball|Tennis|Golf|basketball|soccer|volleyball|tennis|golf)\\b","g"),title:"Team-name capitalization mismatch",reason:"The team name is capitalized away from a sentence opening.",section:"p. 4 · §8",possible:true},
  {id:"sports-game",category:"house",pattern:new RegExp("\\b(volleyball|soccer|tennis)\\s+game\\b","gi"),title:"Sport terminology mismatch",reason:"This competition term differs from the guide’s terminology for this sport.",section:"p. 4 · §8",possible:false},
  {id:"sports-stat",category:"house",pattern:new RegExp("\\b(\\d+)\\s+(yard|foot)\\s+(dash|jump|pass)\\b","gi"),title:"Sports-modifier hyphenation mismatch",reason:"The numeric sports modifier is missing the guide’s hyphenation.",section:"p. 4 · §8",possible:false},
  {id:"acronym-plural",category:"house",pattern:new RegExp("\\b(PDF|RBI|CD|DVD)['’]s\\b","g"),title:"Possible acronym apostrophe error",reason:"This may be a plural rather than a possessive acronym.",section:"p. 3 · §6",possible:true},
  {id:"semicolon",category:"house",pattern:new RegExp(";","g"),title:"Prohibited punctuation",reason:"The guide does not permit semicolons.",section:"p. 3 · §6",possible:false},
  {id:"simple-list-comma",category:"house",pattern:new RegExp("\\b([A-Za-z]+),\\s+([A-Za-z]+),\\s+(and|or)\\s+([A-Za-z]+)\\b","gi"),title:"Possible series-comma mismatch",reason:"A comma appears before the final conjunction in what may be a simple list.",section:"p. 3 · §6",possible:true},
  {id:"exclamation",category:"house",pattern:new RegExp("!+","g"),title:"Prohibited punctuation",reason:"The guide does not permit exclamation points.",section:"p. 3 · §6",possible:false},
  {id:"ellipsis",category:"house",pattern:new RegExp("(?:\\.{3,}|…)","g"),title:"Possible dramatic ellipsis",reason:"The guide prohibits dramatic ellipses. An omission in a quote requires verification.",section:"p. 3 · §6",possible:true},
  {id:"attribution-verb",category:"house",pattern:new RegExp("\\b(?:says|stated|exclaimed|giggled|remarked|declared|commented|replied|explained|added)\\b","gi"),title:"Possible attribution-verb mismatch",reason:"If this is a speech attribution, its verb conflicts with the guide. It may instead be an ordinary reporting verb.",section:"p. 3 · §7",possible:true}
];

function wordCount_(text) { return (text.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)*/gu)||[]).length; }
function escapePattern_(text) { return text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function paragraphList_(text) {
  var list=[],re=/\S[\s\S]*?(?=\r?\n[ \t]*\r?\n|$)/g,m;
  while((m=re.exec(text))!==null){var value=m[0].trimEnd();if(value)list.push({text:value,start:m.index,end:m.index+value.length,index:list.length});}
  return list;
}
function quoteList_(text) {
  var list=[],opened=null;
  for(var i=0;i<text.length;i++){
    var c=text.charAt(i);
    if(c==='“'&&!opened)opened={start:i,kind:'curly'};
    else if(c==='”'&&opened&&opened.kind==='curly'){list.push({start:opened.start,end:i+1,text:text.slice(opened.start+1,i),closed:true});opened=null;}
    else if(c==='"'&&!opened)opened={start:i,kind:'straight'};
    else if(c==='"'&&opened&&opened.kind==='straight'){list.push({start:opened.start,end:i+1,text:text.slice(opened.start+1,i),closed:true});opened=null;}
  }
  if(opened)list.push({start:opened.start,end:text.length,text:text.slice(opened.start+1),closed:false});
  return list;
}
function scanPatterns_(text,re,callback) { var copy=new RegExp(re.source,re.flags.indexOf('g')===-1?re.flags+'g':re.flags),m;while((m=copy.exec(text))!==null){callback(m);if(m[0].length===0)copy.lastIndex++;} }
function parsePeople_(raw) {
  var people=[],errors=[];
  String(raw||'').split(/\r?\n/).forEach(function(line,i){
    if(!line.trim())return;
    var values=line.split('|').map(function(s){return s.trim();}),role=(values[0]||'').toLowerCase();
    if(values.length!==3||!['student','adult'].includes(role)||wordCount_(values[1])<2||!values[2]||(role==='student'&&!/^(9|10|11|12)$/.test(values[2]))){errors.push('Context line '+(i+1)+' is not in the stated format.');return;}
    people.push({role:role,name:values[1],detail:values[2]});
  });
  return {people:people,errors:errors};
}
function diagnoseText_(text,options) {
  options=options||{};
  if(typeof text!=='string'||text.length>50000)throw new Error('Check one draft at a time, up to 50,000 characters.');
  var ps=options.paragraphs||paragraphList_(text),quotes=quoteList_(text),flags=[],limited=false,mode=options.mode==='caption'?'caption':'story';
  var units=mode==='caption'?captionUnits_(text,ps,options.captionLayout):[];
  function unitFor_(start){return units.find(function(p){return start>=p.start&&start<=p.end;});}
  function quoted(start,end){return quotes.some(function(q){return start<q.end&&end>q.start;});}
  function para(index){for(var i=0;i<ps.length;i++){if(index>=ps[i].start&&index<=ps[i].end)return i;}return 0;}
  function startsSentence(index){
    var p=ps[para(index)],before=text.slice(p?p.start:0,index).trimEnd();
    if(/\b(?:Jan|Feb|Aug|Sept|Oct|Nov|Dec|Dr|Mr|Mrs|Ms|Jr|Sr|St|Ave|Blvd|[A-Z])\.$/.test(before)||/[ap]\.m\.$/i.test(before))return false;
    if(/[”"]$/.test(before)&&/\b(?:said|says|stated|exclaimed|giggled|replied|explained|added)\b/.test(text.slice(index,index+100).split(/\n/)[0]))return false;
    return !before||/[.!?][”"')\]]?$/.test(before);
  }
  function flag(id,start,end,title,reason,category,section,possible){
    if(flags.length>=500){limited=true;return;}
    if(start<0||end>text.length||end<=start)return;
    var inQuote=quotes.some(function(q){return start>=q.start&&end<=q.end;});
    flags.push({id:id+'-'+start,ruleId:id,start:start,end:end,excerpt:text.slice(start,end),title:title,reason:reason,category:category||'house',section:section||'',possible:Boolean(possible)||inQuote,inQuote:inQuote,paragraph:para(start)+1});
  }
  function scan(re,cb){scanPatterns_(text,re,cb);}
  DIAGNOSTIC_RULES_.forEach(function(r){scan(r.pattern,function(m){
    if(r.id==='caption-id-in-story'&&mode!=='story')return;
    if(['grade-cap','adult-title-caps','sports-caps','prom'].includes(r.id)&&startsSentence(m.index))return;
    if(['filler','cliche','year-reference','more-than','because-of','when-asked','many-students'].includes(r.id)&&quoted(m.index,m.index+m[0].length))return;
    flag(r.id,m.index,m.index+m[0].length,r.title,r.reason,r.category,r.section,r.possible);
  });});
  scan(/\b([1-9])\s+(students|players|members|volunteers|tickets|lights|cables|rehearsals|meetings)\b/gi,function(m){flag('small-number',m.index,m.index+m[0].length,'Small-count number mismatch','This nonexception count is written as a figure.','house','p. 2 · §3');});
  scan(/\b(\d[\d,]*)\b/g,function(m){if(startsSentence(m.index)&&!quoted(m.index,m.index+m[0].length))flag('sentence-number',m.index,m.index+m[0].length,'Number at a sentence opening','This opening number conflicts with the guide’s sentence-start rule.','house','p. 2 · §3',true);});
  scan(/\b(\d{1,3})-(\d{1,3})(?=\s+(?:win|loss|victory|defeat)\b)/gi,function(m){if(Number(m[1])<Number(m[2]))flag('score-order',m.index,m.index+m[0].length,'Possible score-order mismatch','The first score is smaller, contrary to the guide’s winner-first format. The outcome requires verification.','house','p. 4 · §8',true);});
  var jv=/\bJV\b/g.exec(text);if(jv&&!/\bjunior varsity\b/i.test(text.slice(0,jv.index)))flag('jv-first',jv.index,jv.index+2,'Possible abbreviated first reference','No earlier expanded team-level reference was found in the checked text.','house','p. 4 · §8',true);
  scan(/\b(Jan\.|Feb\.|Aug\.|Sept\.|Oct\.|Nov\.|Dec\.)(?!\s+\d{1,2}\b)/g,function(m){flag('month-alone',m.index,m.index+m[0].length,'Month-alone abbreviation mismatch','A month without a specific day appears in abbreviated form.','house','p. 2 · §4');});
  scan(/\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/g,function(m){flag('weekday-cap',m.index,m.index+m[0].length,'Weekday capitalization error','The weekday name is lowercase.','house','p. 2 · §4');});
  var opening=/^(?:Have you ever wondered\b|Imagine\b|No matter\b|From fall to spring\b|Whether you(?:’|')re a freshman or a senior\b|So if you(?:’|')re looking\b)/i.exec(ps[0]?ps[0].text:'');
  if(opening)flag('banned-opening',ps[0].start,ps[0].start+opening[0].length,'Prohibited opening pattern','This opening matches a pattern prohibited by the publication guide.','house','p. 4 · §9');
  scan(/,\s+(?:I|we|they|he|she|it|you)\s+(?:am|is|are|was|were|have|has|had|can|could|will|would|did|do|does|tested|worked|practiced|won|lost|went|made|checked|replaced)\b/g,function(m){
    var preceding=text.slice(Math.max(text.lastIndexOf('.',m.index)+1,text.lastIndexOf('\n',m.index)+1),m.index);
    if(/\b(?:was|were|is|are|had|have|has|tested|worked|practiced|won|lost|went|made|said|checked|replaced)\b/i.test(preceding))flag('comma-splice',m.index,m.index+m[0].length,'Possible comma splice','Two apparently independent clauses may be joined only by a comma.','grammar','Purdue OWL',true);
  });
  ps.forEach(function(p){
    var unit=unitFor_(p.start),ident=unit&&['IDENT','GROUP_IDENT'].indexOf(captionFormat_(options,unit.index+1))!==-1;
    if(!ident&&(!unit||p.end===unit.end)&&!/[.!?][”"')\]]*$/.test(p.text)&&!quotes.some(function(q){return !q.closed&&q.start<p.end;}))flag('ending-punctuation',p.end-1,p.end,'Possible missing end punctuation','The paragraph has no detected sentence-ending punctuation.','grammar','Purdue OWL',true);
    if(/^(?:Because|Although|Unless|Which is why|Such as)\b/.test(p.text)&&!p.text.includes(',')&&wordCount_(p.text)<25)flag('fragment',p.start,p.end,'Possible sentence fragment','The paragraph may lack an independent clause. Intentional journalistic fragments require context.','grammar','Purdue OWL',true);
    var speakers=[];
    scanPatterns_(p.text,/\b([A-Z][A-Za-z’'-]+)\s+said\b/g,function(m){if(!speakers.includes(m[1]))speakers.push(m[1]);});
    if(speakers.length>1&&!(unit&&captionFormat_(options,unit.index+1)==='GROUP'))flag('speaker-paragraph',p.start,p.end,'Possible speaker change within a paragraph','More than one named speaker attribution was detected in this paragraph.','house','p. 3 · §6',true);
  });
  quotes.forEach(function(q){
    if(!q.closed){flag('unclosed-quote',q.start,q.start+1,'Unclosed or mismatched quotation mark','The opening mark has no detected matching close. Continued quotations require context.','grammar','Purdue OWL',true);return;}
    var p=ps[para(q.start)];if(!p)return;
    var after=text.slice(q.end,p.end),before=text.slice(p.start,q.start),speech=q.start===p.start||/\b(?:said|stated|exclaimed|says|replied|explained|added)\b/.test(after);
    if(!speech)return;
    if(/^\s*,/.test(after))flag('quote-comma',q.end-1,q.end+after.match(/^\s*,/)[0].length,'Quotation comma placement mismatch','The comma appears outside the closing quotation mark.','house','p. 3 · §6',true);
    var attribution=/\b(?:said|says|stated|exclaimed|giggled|replied|remarked|explained|added|commented|declared)\b/.test(after);
    if(!attribution&&!/\bsaid\b/.test(before))flag('missing-attribution',q.start,q.end,'Possible missing quote attribution','No attribution was detected beside this quoted passage.','house','p. 3 · §7',true);
    else if(attribution&&!/[,.!?]$/.test(q.text))flag('quote-punctuation',q.end-1,q.end,'Possible missing quotation punctuation','No punctuation was detected before the closing quote next to the attribution.','house','p. 3 · §6',true);
    if((q.text.match(/[.!?](?:\s|$)/g)||[]).length>=2&&!/\bsaid\b/.test(before))flag('late-attribution',q.start,q.end,'Possible delayed attribution','Multiple sentences appear in the quote before its first detected attribution.','house','p. 3 · §7',true);
  });
  scan(/”/g,function(m){if(!quotes.some(function(q){return q.closed&&q.end===m.index+1;}))flag('orphan-quote',m.index,m.index+1,'Possible unmatched closing quotation mark','No matching curly opening mark was detected.','grammar','Purdue OWL',true);});
  scan(/\bsaid\s+[A-Z][A-Za-z’'-]+/g,function(m){if(!quoted(m.index,m.index+m[0].length))flag('attribution-order',m.index,m.index+m[0].length,'Attribution-order mismatch','The attribution appears in verb-before-name order.','house','p. 3 · §7',true);});
  (mode==='caption'?[]:(options.people||[])).forEach(function(person){
    var occurrences=[];
    scan(new RegExp('(?<![\\p{L}])'+escapePattern_(person.name)+'(?![\\p{L}])','gu'),function(m){occurrences.push(m);});
    if(!occurrences.length)return;
    var first=occurrences[0],firstEnd=first.index+first[0].length;
    if(person.role==='student'){
      if(mode==='story'){
        var grade={9:'freshman',10:'sophomore',11:'junior',12:'senior'}[person.detail];
        if(!new RegExp('\\b'+grade+'\\s+$','i').test(text.slice(Math.max(0,first.index-14),first.index)))flag('student-id',first.index,firstEnd,'Possible student first-reference mismatch','The first ID does not match the verified grade context and story-ID rule. References elsewhere on the spread may affect this.','house','p. 1 · §1',true);
      }else if(!new RegExp('^\\s*\\('+person.detail+'\\)').test(text.slice(firstEnd)))flag('caption-id',first.index,firstEnd,'Possible caption-ID mismatch','The first caption ID lacks the grade marker matching the verified context.','house','p. 1 · §1',true);
      var last=person.name.split(' ').slice(-1)[0];
      scan(new RegExp('\\b'+escapePattern_(last)+'(?=\\s+said\\b)','g'),function(m){if(m.index>firstEnd&&!occurrences.some(function(o){return m.index>=o.index&&m.index<o.index+o[0].length;}))flag('student-later-name',m.index,m.index+last.length,'Possible student later-reference mismatch','A supplied student surname appears alone in a later attribution.','house','p. 1 · §1',true);});
    }else if(!new RegExp(escapePattern_(person.detail)+'\\s+$','i').test(text.slice(Math.max(0,first.index-person.detail.length-4),first.index)))flag('adult-id',first.index,firstEnd,'Possible adult first-reference mismatch','The first ID does not contain the title supplied in the verified context. Credentials may affect the ID.','house','p. 1 · §2',true);
    occurrences.slice(1).forEach(function(m){flag('later-full-name',m.index,m.index+m[0].length,'Possible repeated full-name reference','The guide’s later-reference form differs from this repeated full name. Identity and spread context require verification.','house','p. 1 · §§1–2',true);});
  });
  var map=ps.map(function(p,i){
    var here=quotes.filter(function(q){return q.start<p.end&&q.end>p.start;}),length=here.reduce(function(n,q){return n+Math.max(0,Math.min(q.end,p.end)-Math.max(q.start,p.start));},0),begins=/^\s*[“"]/.test(p.text);
    return {index:i+1,start:p.start,end:p.end,excerpt:p.text.slice(0,180),role:i===0&&!begins?'lead':begins||length>p.text.length*.5?'quote':'transition',quotes:here.length};
  });
  if(ps.length&&mode==='story'){
    if(map[0].role!=='lead')flag('lead-position',ps[0].start,ps[0].end,'Possible missing lead','The first paragraph was detected as a quote rather than a lead.','structure','Staff LQTQ format',true);
    if(map.filter(function(p){return p.role==='quote';}).length<2)flag('lqtq-incomplete',ps[0].start,ps[0].end,'Incomplete detected LQTQ sequence','Fewer than two quote paragraphs were detected.','structure','Staff LQTQ format',true);
    if(map.length>1&&map[1].role!=='quote')flag('first-quote-position',ps[1].start,ps[1].end,'Possible LQTQ order mismatch','The paragraph after the lead was not detected as a quote.','structure','Staff LQTQ format',true);
    for(var j=2;j<map.length;j++)if(map[j].role===map[j-1].role)flag('lqtq-repeat',ps[j].start,ps[j].end,'Possible missing LQTQ block','Consecutive paragraphs were detected with the same role instead of alternating transition/quote roles.','structure','Staff LQTQ format',true);
    if(map.length>1&&map[map.length-1].role!=='quote')flag('kicker',ps[ps.length-1].start,ps[ps.length-1].end,'Possible missing quote ending','The last paragraph was not detected as a quote.','structure','Staff LQTQ format',true);
  }
  var captionMap=[];
  if(mode==='caption'){
    scan(/\b(?:[Ff]reshman|[Ss]ophomore|[Jj]unior|[Ss]enior)\s+(?:[A-Z][\p{L}’'-]+|[A-Z]\.)\s+[A-Z][\p{L}’'-]+/gu,function(m){
      if(!quoted(m.index,m.index+m[0].length))flag('caption-story-id',m.index,m.index+m[0].length,'Story-style student ID in a caption','This grade-word plus student-name ID is a story-copy form, not the caption ID form.','house','p. 1 · §1');
    });
    units.forEach(function(p,i){
      var format=captionFormat_(options,i+1);
      var photos=(options.captionPhotoCounts||{})[String(i+1)]||0;
      captionMap.push(inspectCaption_(p,format,flag,photos,options.people));
      (options.people||[]).forEach(function(person){
        var occurrences=[];
        scanPatterns_(p.text,new RegExp('(?<![\\p{L}])'+escapePattern_(person.name)+'(?![\\p{L}])','gu'),function(m){occurrences.push(m);});
        if(!occurrences.length)return;
        var first=occurrences[0],start=p.start+first.index,end=start+first[0].length;
        if(person.role==='student'&&format!=='GROUP_IDENT'){
          var grade=/^\s*\((\d{1,2})\)/.exec(p.text.slice(first.index+first[0].length));
          if(!grade)flag('caption-id',start,end,'Possible caption-ID mismatch','No parenthesized grade was detected after the supplied student name.','house','Style Guide · p. 1 · §1',true);
          else if(grade[1]!==person.detail)flag('caption-grade-mismatch',start,end+grade[0].length,'Caption grade differs from verified context','The caption’s grade number does not match the supplied verified grade.','house','Style Guide · p. 1 · §1',true);
          if(['GROUP','IDENT'].indexOf(format)===-1)occurrences.slice(1).forEach(function(m){flag('caption-later-full-name',p.start+m.index,p.start+m.index+m[0].length,'Possible later full-name reference','The student’s full name is repeated within this caption.','house','Style Guide · p. 1 · §1',true);});
          var last=person.name.split(' ').slice(-1)[0];
          scanPatterns_(p.text,new RegExp('\\b'+escapePattern_(last)+'(?=\\s+said\\b)','g'),function(m){if(m.index>first.index+first[0].length&&!occurrences.some(function(o){return m.index>=o.index&&m.index<o.index+o[0].length;}))flag('caption-student-later-name',p.start+m.index,p.start+m.index+last.length,'Possible student later-reference mismatch','A supplied student surname appears alone in a later caption attribution.','house','Style Guide · p. 1 · §1',true);});
        }else if(person.role==='adult'&&format!=='GROUP_IDENT'){
          var prefix=p.text.slice(Math.max(0,first.index-person.detail.length-4),first.index);
          if(!new RegExp(escapePattern_(person.detail)+'\\s+$','i').test(prefix))flag('caption-adult-id',start,end,'Possible adult first-reference mismatch','The adult ID does not contain the title supplied in the verified context.','house','Style Guide · p. 1 · §2',true);
        }
      });
    });
    flags.forEach(function(f){var unit=unitFor_(f.start);if(unit)f.caption=unit.index+1;});
  }
  flags=flags.filter(function(f,i,a){return a.findIndex(function(o){return o.ruleId===f.ruleId&&o.start===f.start&&o.end===f.end;})===i;}).sort(function(a,b){return a.start-b.start||a.ruleId.localeCompare(b.ruleId);});
  return {findings:flags,map:map,captionMap:captionMap,limited:limited,stats:{words:wordCount_(text),paragraphs:ps.length,captionCount:captionMap.length,quotes:map.filter(function(p){return p.role==='quote';}).length}};
}


// Caption formats are selected by the user. Component detection is diagnostic,
// not a semantic claim about what the photograph shows.
var CAPTION_FORMATS_ = ['ABCD','ABC','BC','ACD','AB','GROUP','IDENT','GROUP_IDENT','QUOTE'];
function captionUnits_(text,paragraphs,layout) {
  var units=[];
  paragraphs.forEach(function(p){
    var last=units.length?units[units.length-1]:null;
    if(layout==='blank'&&last&&p.breakBefore===false){last.end=p.end;last.text=text.slice(last.start,last.end);}
    else units.push({index:units.length,start:p.start,end:p.end,text:p.text,leadingBold:p.leadingBold||null});
  });
  return units;
}
function captionFormat_(options,index) {
  var value=(options.captionFormats||{})[String(index)]||options.captionFormat||'ABCD';
  return CAPTION_FORMATS_.indexOf(value)===-1?'ABCD':value;
}
function captionWordCount_(text) { return (text.match(/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu)||[]).length; }
function captionSentences_(text,start,end) {
  var spans=[],begin=start;
  function push(stop){var value=text.slice(begin,stop),left=value.search(/\S/);if(left!==-1){var trimmed=value.trimEnd();spans.push({text:text.slice(begin+left,begin+trimmed.length),start:begin+left,end:begin+trimmed.length});}begin=stop;}
  for(var i=start;i<end;i++){
    if(!/[.!?]/.test(text.charAt(i)))continue;
    if(text.charAt(i)==='.'){
      if(/\d/.test(text.charAt(i-1))&&/\d/.test(text.charAt(i+1)))continue;
      var before=text.slice(start,i+1);
      if(/\b(?:Jan|Feb|Aug|Sept|Oct|Nov|Dec|Dr|Mr|Mrs|Ms|Jr|Sr|St|Ave|Blvd|[A-Z])\.$/.test(before)||/[ap]\.m\.$/i.test(before))continue;
      if(/^[ap]\.$/i.test(text.slice(Math.max(start,i-1),i+1)))continue;
    }
    if(i+1===end||/\s/.test(text.charAt(i+1)))push(i+1);
  }
  if(begin<end)push(end);
  return spans;
}
function captionTense_(sentence) {
  var text=sentence.text,ids=/\((?:9|10|11|12)\)/g,m,last=0;
  while((m=ids.exec(text))!==null)last=m.index+m[0].length;
  if(last)text=text.slice(last);
  var progressive=/\b(is|are|am|was|were)\s+(?:[a-z]+ly\s+)?[a-z]+ing\b/i.exec(text);
  if(progressive)return {kind:/^(?:was|were)$/i.test(progressive[1])?'past':'progressive',evidence:progressive[0]};
  var match=/\b(blocks|dives|sprints|rehearses|sketches|solders|stirs|celebrates|studies|paints|plays|jumps|spikes|runs|walks|checks|tests|holds|wins|makes|builds|works|performs|practices|practises|tapes|hugs|races|waits|aims|strums|attaches|cuts|climbs|catches|serves|writes|reads|sings|dances|prepares|competes|carries|passes|shoots|kicks|raises|sets|opens|closes|gathers|presents|leads|helps|talks|listens|watches|is|are|has|have|blocked|dived|dove|sprinted|rehearsed|sketched|soldered|stirred|celebrated|studied|painted|played|jumped|spiked|ran|walked|checked|tested|held|won|made|built|worked|performed|practiced|practised|taped|hugged|raced|waited|aimed|strummed|attached|climbed|caught|served|wrote|sang|danced|prepared|competed|carried|passed|shot|kicked|raised|opened|closed|gathered|presented|led|helped|talked|listened|watched|was|were|had|finished|earned|scored|clinched|replaced|revealed)\b/i.exec(text);
  if(!match)return {kind:'unknown',evidence:''};
  return {kind:/^(?:blocked|dived|dove|sprinted|rehearsed|sketched|soldered|stirred|celebrated|studied|painted|played|jumped|spiked|ran|walked|checked|tested|held|won|made|built|worked|performed|practiced|practised|taped|hugged|raced|waited|aimed|strummed|attached|climbed|caught|served|wrote|sang|danced|prepared|competed|carried|passed|shot|kicked|raised|opened|closed|gathered|presented|led|helped|talked|listened|watched|was|were|had|finished|earned|scored|clinched|replaced|revealed)$/i.test(match[0])?'past':'present',evidence:match[0]};
}
function inspectCaption_(p,format,emit,photoCount,people) {
  var text=p.text,offset=p.start,quotes=quoteList_(text),parts={},lead=null,index=p.index+1;
  function issue(id,start,end,title,reason,possible){emit('caption-'+id,offset+start,offset+Math.max(start+1,end),title,reason,'caption','Caption Guide · pp. 1–2',possible);}
  function missing(letter){issue(letter.toLowerCase()+'-missing',0,text.length,'Possible missing '+letter+' component','The '+letter+' component was not identified for the selected '+format+' format.',true);}
  var notes=[];
  var adultIDs=[];
  (people||[]).filter(function(person){return person.role==='adult';}).forEach(function(person){
    scanPatterns_(text,new RegExp(escapePattern_(person.detail)+'\\s+'+escapePattern_(person.name),'gi'),function(m){if(!quotes.some(function(q){return m.index>=q.start&&m.index<q.end;}))adultIDs.push(m);});
  });
  scanPatterns_(text,/\b(?:pictured(?: above)?|shown above|left to right)\b/gi,function(m){if(!quotes.some(function(q){return m.index>=q.start&&m.index<q.end;}))issue('photo-reference',m.index,m.index+m[0].length,'Prohibited caption reference','This wording matches a photo-reference phrase prohibited by the caption guide.',false);});
  scanPatterns_(text,/\?/g,function(m){if(!quotes.some(function(q){return m.index>=q.start&&m.index<q.end;}))issue('question',m.index,m.index+1,'Question in staff-written caption copy','The caption guide prohibits questions in staff-written caption text.',false);});
  var fullID=/(?:[A-Z][\p{L}’'-]+|[A-Z]\.)\s+[A-Z][\p{L}’'-]+\s*\((?:9|10|11|12)\)/gu;
  if(format==='IDENT'||format==='GROUP_IDENT'||format==='GROUP'||format==='QUOTE'){
    var ids=[];scanPatterns_(text,fullID,function(m){ids.push(m);});
    if(format==='IDENT'){
      if(!ids.length&&!adultIDs.length)issue('ident-name-grade',0,text.length,'Photo ident lacks a detected name/grade ID','No complete student name/grade ID or verified adult title/name ID was detected.',true);
      else{
        var remainder=text;adultIDs.slice().sort(function(a,b){return b.index-a.index;}).forEach(function(m){remainder=remainder.slice(0,m.index)+remainder.slice(m.index+m[0].length);});
        var remaining=remainder.replace(fullID,'').replace(/\b(?:and)\b/gi,'').replace(/[\s,;&.]+/g,'');
        if(remaining)issue('ident-extra-copy',0,text.length,'Possible narrative text in a photo ident','Text beyond the detected name/grade IDs appears in this photo ident.',true);
      }
    }
    if(format==='GROUP_IDENT'){
      if(!/\b(?:Front|Back|Middle|Top|Bottom|First|Second|Third|Fourth|Fifth|\d+(?:st|nd|rd|th))\s+row\s*:/i.test(text))issue('rows-missing',0,text.length,'Possible missing row labels','No row label was detected for this group ident.',true);
      if(!/(?:[A-Z][\p{L}’'-]+|[A-Z]\.)\s+[A-Z][\p{L}’'-]+/u.test(text))issue('group-names-missing',0,text.length,'Possible missing full names','No full-name pattern was detected in this group ident.',true);
    }
    if((format==='IDENT'||format==='GROUP_IDENT')&&quotes.some(function(q){return q.closed;}))issue('ident-quote',0,text.length,'Quoted copy in an ident','This ident style does not include a direct-quote component.',true);
    if(format==='QUOTE'){
      var directQuotes=quotes.filter(function(q){return q.closed;});
      if(!directQuotes.length)missing('D');
      else{
        var total=directQuotes.reduce(function(n,q){return n+Math.max(1,captionSentences_(q.text,0,q.text.length).length);},0);
        if(total!==2)issue('d-sentences',directQuotes[0].start,directQuotes[directQuotes.length-1].end,'Possible D sentence-count mismatch','The guide specifies two quoted sentences; '+total+' were detected.',true);
      }
      if(!adultIDs.length&&!ids.some(function(m){return !quotes.some(function(q){return m.index>=q.start&&m.index<q.end;});}))issue('quote-caption-id',0,text.length,'Possible missing quote-caption ID','No student name/grade ID or verified adult title/name ID was detected outside the quotation.',true);
    }
    if(format==='GROUP'){
      var labels=[];
      scanPatterns_(text,/\b(?:Top(?: left| right)?|Bottom(?: left| right)?|Center|Left|Right|Photo\s+\d+)\s*:/gi,function(m){if(!quotes.some(function(q){return m.index>=q.start&&m.index<q.end;}))labels.push(m);});
      var count=photoCount||labels.length;
      if(count>4)issue('group-photo-count',0,text.length,'Group caption exceeds the photo limit','The entered count or detected labels exceed the guide’s four-photo maximum.',false);
      if(photoCount&&labels.length&&photoCount!==labels.length)issue('group-count-labels',0,text.length,'Possible group photo-count mismatch','The supplied photo count differs from the detected number of photo labels.',true);
      if(labels.length){
        var covered=0;
        labels.forEach(function(label,i){var segment=text.slice(label.index,i+1<labels.length?labels[i+1].index:text.length);if(quoteList_(segment).some(function(q){return q.closed;}))covered++;});
        if(covered<Math.ceil(count/2))issue('group-quote-coverage',0,text.length,'Possible insufficient group-quote coverage','Fewer than half of the supplied or labeled photos have a detected quote in their labeled entry.',true);
      }else if(count&&!quotes.some(function(q){return q.closed;}))issue('group-quote-coverage',0,text.length,'Missing detected group-caption quotes','No complete quote was detected for the supplied photo group.',true);
      else notes.push('Photo count and which photos have quotes need verification; no photo labels were detected.');
      notes.push('The checker does not inspect the photos or identify the people pictured.');
    }
    return {index:index,start:p.start,end:p.end,format:format,excerpt:text.slice(0,180),components:[],notes:notes,photoCount:photoCount||0};
  }
  var meta=p.leadingBold;
  if(meta&&meta.text&&meta.end<text.trimEnd().length){lead={text:meta.text,start:meta.start,end:meta.end,bold:true};}
  if(!lead){
    var firstWords=[],re=/\S+/g,m;
    while((m=re.exec(text))!==null&&firstWords.length<6)firstWords.push({text:m[0],start:m.index,end:m.index+m[0].length});
    for(var w=2;w<=4&&w<firstWords.length;w++){
      var candidate=firstWords[w],prefix=text.slice(0,candidate.start).trim();
      if(/^(?:[A-Z][\p{L}]*ing|At|During|After|Before|With|As|While|In|On|For|Under|Between|The)\b/u.test(candidate.text)&&!/[.!?]/.test(prefix)){
        lead={text:prefix,start:text.search(/\S/),end:candidate.start,bold:false};break;
      }
    }
  }
  if(lead){
    parts.A=lead;
    if(format.indexOf('A')===-1)issue('a-unexpected',lead.start,lead.end,'Possible unexpected A component','A lead-in was detected, but '+format+' does not include A.',true);
    else{
      var count=captionWordCount_(lead.text);
      if(count<2||count>4)issue('a-length',lead.start,lead.end,'A lead-in length mismatch','The detected action lead-in is outside the guide’s 2–4 word range.',false);
      if(/\.\s*$/.test(lead.text))issue('a-period',lead.start,lead.end,'A lead-in punctuation mismatch','The detected action lead-in ends with a period.',false);
      if(meta&&meta.known&&!lead.bold)issue('a-bold',lead.start,lead.end,'Possible A lead-in formatting mismatch','The detected lead-in does not have the guide’s bold formatting.',true);
    }
  }else if(format.indexOf('A')!==-1)missing('A');
  var bodyStart=lead?lead.end:0;
  var direct=quotes.filter(function(q){return q.closed&&q.start>=bodyStart;}),firstQuote=direct.length?direct[0].start:text.length;
  var sentences=captionSentences_(text,bodyStart,firstQuote),needB=format.indexOf('B')!==-1,needC=format.indexOf('C')!==-1,needD=format.indexOf('D')!==-1;
  if(needB&&needC){
    if(sentences.length>=2){
      if(captionTense_(sentences[0]).kind==='past'&&captionTense_(sentences[1]).kind==='present'){
        parts.C=sentences[0];parts.B=sentences[1];issue('bc-order',sentences[0].start,sentences[1].end,'Possible B/C order mismatch','Past-tense information appears before the detected present-tense photo information.',true);
      }else{parts.B=sentences[0];parts.C=sentences[1];}
    }else if(sentences.length===1){if(captionTense_(sentences[0]).kind==='past')parts.C=sentences[0];else parts.B=sentences[0];}
  }else if(needB&&sentences.length){
    parts.B=sentences[0];
    if(sentences.length>1&&captionTense_(sentences[1]).kind==='past')issue('c-unexpected',sentences[1].start,sentences[1].end,'Possible unexpected C component','Past-tense complementary information was detected, but '+format+' does not include C.',true);
  }else if(needC&&sentences.length){
    if(sentences.length>=2&&captionTense_(sentences[0]).kind==='present'&&captionTense_(sentences[1]).kind==='past'){
      parts.B=sentences[0];parts.C=sentences[1];issue('b-unexpected',sentences[0].start,sentences[0].end,'Possible unexpected B component','Present-tense photo information was detected, but '+format+' does not include B.',true);
    }else parts.C=sentences[0];
  }
  if(needB&&!parts.B)missing('B');
  if(needC&&!parts.C)missing('C');
  if(parts.B){
    var bt=captionTense_(parts.B);
    if(bt.kind==='past'||bt.kind==='progressive')issue('b-tense',parts.B.start,parts.B.end,'Possible B tense mismatch','The detected basic-info sentence does not appear to use simple present tense.',true);
    if(/^\s*[A-Z][\p{L}’'-]+\s+[A-Z][\p{L}’'-]+\s*\((?:9|10|11|12)\)/u.test(parts.B.text))issue('b-name-start',parts.B.start,parts.B.end,'B sentence starts with a student ID','The basic-info sentence begins with a student’s name rather than the action.',true);
  }
  if(parts.C&&captionTense_(parts.C).kind==='present')issue('c-tense',parts.C.start,parts.C.end,'Possible C tense mismatch','The detected complementary-info sentence appears to use present rather than past tense.',true);
  if(direct.length){
    parts.D={start:direct[0].start,end:direct[direct.length-1].end,text:text.slice(direct[0].start,direct[direct.length-1].end)};
    if(!needD)issue('d-unexpected',parts.D.start,parts.D.end,'Possible unexpected D component','A quoted passage was detected, but '+format+' does not include D. A quoted title may need context.',true);
    else{
      var quoteSentences=direct.reduce(function(total,q){return total+Math.max(1,captionSentences_(q.text,0,q.text.length).length);},0);
      if(quoteSentences!==2)issue('d-sentences',parts.D.start,parts.D.end,'Possible D sentence-count mismatch','The guide specifies two quoted sentences; '+quoteSentences+' were detected.',true);
      var tail=text.slice(parts.D.end).trim();
      if(tail&&!/^(?:[A-Z][\p{L}’'.-]*(?:\s+[A-Z][\p{L}’'.-]*){0,3}|he|she|they)\s+said[.!?]?$/u.test(tail))issue('d-order',parts.D.end,text.length,'Possible information after D','Non-quote material appears after the final detected quote component.',true);
    }
  }else if(needD)missing('D');

  return {index:index,start:p.start,end:p.end,format:format,excerpt:text.slice(0,180),notes:notes,photoCount:0,components:format.split('').map(function(letter){var part=parts[letter];return {letter:letter,detected:Boolean(part),start:part?offset+part.start:p.start,end:part?offset+part.end:p.end};})};
}

