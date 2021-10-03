let myleads=[]
const inputel=document.getElementById("input-el")
const inputbtn=document.getElementById("input-btn")
const ulel=document.getElementById('ul-el')
const deletebtn=document.getElementById("del-btn")
const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myleads")) 
const tabbtn=document.getElementById("tab-btn")
if(leadsfromlocalstorage){
    myleads=leadsfromlocalstorage
    render(myleads)
}
tabbtn.addEventListener("click",function () {
    chrome.tabs.query({active:true, currentWindow:true,},function (tabs) {
      myleads.push(tabs[0].url)
      localStorage.setItem("myleads", JSON.stringify(myleads))  
      render(myleads)     
    })    
})
function render (leads) {
let listItems=""
for (let i = 0; i < leads.length; i++) {
listItems+=`
<li>
<a target='_blank' href='${leads[i]}'>${leads[i]}</a>
</li>`
}
ulel.innerHTML=listItems
}
deletebtn.addEventListener("dblclick",function () {
    localStorage.clear()
    myleads=[]
    render(myleads) 
})
inputbtn.addEventListener('click',function () {
    myleads.push(inputel.value)
    inputel.value=""  
    localStorage.setItem("myleads", JSON.stringify(myleads))  
    render(myleads) 
})
