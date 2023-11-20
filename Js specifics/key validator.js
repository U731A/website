let shown = document.getElementById("shown");
let mainDiv = document.getElementById("drop-down");
let divHidden = document.getElementById("div-hidden");
let hiddenElements = document.getElementsByClassName("selection");
let keyInput = document.getElementById("key-input");
let divKey = document.getElementById("license-key");
let selectedAsset = null;
const assetList = [
    "Choco Texture",
    "Cloak",
    "Elemental Skins",
    "Finnicki",
    "Gana Texture",
    "Horn Pack",
    "Laser Tag Vest",
    "Minecraft Armor",
    "Overalls",
    "Public Avatars Textures",
    "Regulus Harness",
    "Regulus Plush",
    "Regulus Latex Suit",
    "Sunset Fit",
];
const keys = [
    "_R5r9v15W8RrcRQIH9AT7A==",
    "JPyYXRv7bX8nLusGnxs1PQ==",
    "vBcyW4KbaX-LLd7gII_fTQ==",
    "acRVzyiXGTxljFo3HArB9g==",
    "gE9rPp6gaISGa5eCbnaRoQ==",
    "s0Pfu08npvvSwHNSQSlOew==",
    "__-XrINJ0kZo9WmtNZn0jQ==",
    "bPw2n9RGJU5lBBxdXHq_9w==",
    "7HM4katzqRe5yB4LyDegIw==",
    "CSND3iPEhDtcDcYcEWccng==",
    "-QfTZm0uzw6qcJvUwNqG9A==",
    "FLc62VP9L-JQffowpsUWMA==",
    "a0_o7TbbOFPpoljIs-UsqQ==",
    "sHFWi-hfkLenXlSyqGE9UQ==",
]
initPage();
function initPage(){
    shown.innerHTML = "None Selected";
    for (let i = 0; i < assetList.length; i++){
    let p = document.createElement("p");
        p.innerText = i + " " +assetList[i];
        p.setAttribute("onclick", "selectAsset("+i+")");
        p.className = "drop-down-selection";
        divHidden.appendChild(p);
    }
}
function openDropdown(){
    divHidden.style.display = "block";
    mainDiv.style.height = "auto";
    mainDiv.style.border = "1px solid black";
    shown.style.borderBottom = "2px solid black";
    mainDiv.style.borderRadius = "5px";
}
function closeDropdown(){
    divHidden.style.display = "hidden";
    mainDiv.style.height = "1.3em";
    mainDiv.style.border = "none";
    shown.style.borderBottom = "none";
    mainDiv.style.borderRadius = "15px";
}
function selectAsset(value){
    console.log(value);

    closeDropdown();
    shown.innerText = assetList[value];
    divKey.style.display = "block";
    document.getElementById("find-key").style.display = "block";

    // send new ID
    updateID(keys[value]);
}
function validate(){
    request(keyInput.value);
}