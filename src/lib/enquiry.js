// Enquiry and subscribe form logic, ported unchanged from the original static site.
/* eslint-disable */
const EMAIL_RE=/^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[A-Za-z]{2,}$/;
// Trims, normalises line endings, strips control characters and caps length without splitting emoji.
function cleanText(v,max){ const s=String(v==null?"":v).replace(/\r\n?/g,"\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").trim(); const a=Array.from(s); return a.length>max?a.slice(0,max).join(""):s; }
function phoneDigits(v){ return String(v==null?"":v).replace(/[\s().-]/g,""); }
// Australian mobiles and landlines (0412 345 678, 02 9876 5432, +61 412 345 678), 1300/1800/13 numbers, or any +country number.
function validPhone(v){ const p=phoneDigits(v); return /^(?:\+?61|0)[2-478]\d{8}$/.test(p)||/^1[38]00\d{6}$/.test(p)||/^13\d{4}$/.test(p)||/^\+[1-9]\d{7,14}$/.test(p); }
function validateEnquiry(raw){
  raw=raw||{};
  const d={kind:raw.kind==="subscribe"?"subscribe":"enquiry",name:cleanText(raw.name,120),company:cleanText(raw.company,160),email:cleanText(raw.email,254).toLowerCase(),
    phone:cleanText(raw.phone,40),industry:cleanText(raw.industry,80),message:cleanText(raw.message,5000),marketing:raw.marketing===true||raw.marketing==="yes",website:cleanText(raw.website,200)};
  const errors={};
  if(d.kind==="enquiry"&&!d.name) errors.name="Enter your name.";
  if(!d.email) errors.email="Enter your email address.";
  else if(!EMAIL_RE.test(d.email)) errors.email="Enter an email address like name@company.com.au.";
  if(d.phone&&!validPhone(d.phone)) errors.phone="Enter a valid phone number, for example 0412 345 678.";
  if(Array.from(String(raw.message==null?"":raw.message).trim()).length>5000) errors.message="Keep your message under 5,000 characters.";
  return {ok:!Object.keys(errors).length,data:d,errors,spam:!!d.website};
}
function enquirySubject(d){ return d.kind==="subscribe"?"Insights subscription: "+d.email:"Website enquiry from "+(d.name||d.email)+(d.company?" ("+d.company+")":""); }
function enquiryBody(d){
  if(d.kind==="subscribe") return "Please add "+d.email+" to the StacCraft Insights email list.\n\nI agree to receive emails from StacCraft and can unsubscribe at any time.";
  const L=["Name: "+d.name];
  if(d.company) L.push("Company: "+d.company);
  L.push("Email: "+d.email);
  if(d.phone) L.push("Phone: "+d.phone);
  if(d.industry) L.push("Industry: "+d.industry);
  L.push("Happy to receive marketing emails: "+(d.marketing?"Yes":"No"));
  if(d.message) L.push("","Message:",d.message);
  return L.join("\n");
}
// mailto links over ~2,000 characters fail in some email apps, so long messages are shortened (whole characters only).
function buildMailto(to,d,maxLen){
  maxLen=maxLen||1900;
  const head="mailto:"+encodeURIComponent(to).replace(/%40/g,"@")+"?subject="+encodeURIComponent(enquirySubject(d))+"&body=";
  let chars=Array.from(enquiryBody(d)); let href=head+encodeURIComponent(chars.join(""));
  while(href.length>maxLen&&chars.length>40){ chars=chars.slice(0,Math.floor(chars.length*0.9)); href=head+encodeURIComponent(chars.join("")+"…\n\n[Message shortened. Please paste the rest here.]"); }
  return href;
}
// JSON body for a form service such as Web3Forms or Formspree.
function buildPayload(d,opt){
  opt=opt||{};
  const p={subject:enquirySubject(d),from_name:d.name||d.email,name:d.name,email:d.email,replyto:d.email,company:d.company,phone:d.phone,industry:d.industry,
    message:d.message,marketing_opt_in:d.marketing?"yes":"no",kind:d.kind,page:opt.page||"",to:opt.to||""};
  if(opt.accessKey) p.access_key=opt.accessKey;
  return p;
}

export { EMAIL_RE, cleanText, validPhone, validateEnquiry, enquirySubject, enquiryBody, buildMailto, buildPayload };
