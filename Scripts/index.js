/*************SELECTORS***************/
let Bill = document.querySelector(".Bill");
let TipBtns = document.querySelectorAll(".items");
let PeopleNbr = document.querySelector(".Person");
let CostumTips = document.querySelector(".Costum");
let TipAmount = document.querySelector(".Tip-amount");
let TotalAmount = document.querySelector(".Total-amount");
let Reset = document.querySelector(".Btn-content");
let Info = document.querySelector(".Info-mobile");
let Attr = document.querySelector(".attribution");

let BillDefault = 0.0;
let TipDefault = 0.05;
let PeopleNbrDefault = 1;
/****************Events*****************/
Bill.addEventListener("input", InputBill);
TipBtns.forEach((item) => {
  item.addEventListener("click", SelectTips);
});
CostumTips.addEventListener("input", InputCostum);
PeopleNbr.addEventListener("input", InputPeople);
Reset.addEventListener("click", ResetBtn);
Info.addEventListener("click", Open);
Attr.addEventListener("click", Close);
/****************Functions*****************/
function Open() {
  Attr.classList.add("OpenAttr");
  Info.classList.add("CloseBtn");
}
function Close() {
  Attr.classList.remove("OpenAttr");
  Info.classList.remove("CloseBtn");
}
function validator(type, input) {
  let regx;
  type === "float" ? (regx = /^[0-9]*\.?[0-9]*$/) : (regx = /^[0-9]*$/);

  return input.value.match(regx);
}

function InputBill() {
  !validator("float", Bill)
    ? (Bill.value = Bill.value.substring(0, Bill.value.length - 1))
    : null;
  BillValue = parseFloat(Bill.value) || 0.0;
  FinalResult();
}
function SelectTips() {
  TipBtns.forEach((item) => {
    item.classList.remove("Activate");
  });
  this.classList.add("Activate");
  CostumTips.value = "";
  TipDefault = parseInt(this.textContent) / 100;
  FinalResult();
}

function InputCostum() {
  if (!validator("int", CostumTips)) {
    CostumTips.value = CostumTips.value.substring(
      0,
      CostumTips.value.length - 1
    );
  }
  TipBtns.forEach((item) => {
    item.classList.remove("Activate");
  });
  TipDefault = parseInt(CostumTips.value) / 100 || 0;
  FinalResult();
}

function InputPeople() {
  if (!validator("int", PeopleNbr)) {
    PeopleNbr.value = PeopleNbr.value.substring(0, PeopleNbr.value.length - 1);
  }
  if (PeopleNbr.value <= 0) {
    PeopleNbr.parentElement.firstElementChild.lastElementChild.classList.add(
      "Error"
    );
    PeopleNbr.classList.add("Message-border");
  } else {
    PeopleNbr.parentElement.firstElementChild.lastElementChild.classList.remove(
      "Error"
    );
    PeopleNbr.classList.remove("Message-border");
  }
  PeopleNbrDefault = parseInt(PeopleNbr.value) || 1;
  FinalResult();
}

function FinalResult() {
  if (PeopleNbrDefault > 0) {
    TipAmount.textContent =
      "$" + ((BillValue * TipDefault) / PeopleNbrDefault).toFixed(2);
    TotalAmount.textContent =
      "$" + ((BillValue * (TipDefault + 1)) / PeopleNbrDefault).toFixed(2);
    Reset.classList.remove("Disabled");
  }
}
function ResetBtn() {
  Bill.value = "";
  BillDefault = 0.0;
  TipBtns[0].click();
  PeopleNbr.value = "";
  PeopleNbrDefault = 1;
  PeopleNbr.parentElement.firstElementChild.lastElementChild.classList.remove(
    "Error"
  );
  Reset.classList.add("Disabled");
}
