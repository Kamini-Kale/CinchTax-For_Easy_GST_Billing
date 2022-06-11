//igst from cgst
function copy_to_igst(t) {
    let mainParent = t.parentNode.parentNode.parentNode;
    if (t.value.endsWith("%") == false) t.value = `${t.value}%`;
    let igst = t.value;
    igst = parseInt(igst.slice(0, igst.length - 1));
    igst = (igst+igst);
    //mainParent.children[8].children[0].innerHTML = t.value;
    document.getElementById("igst1").value = igst;
    console.log(document.getElementById("igst1").value);
  }
  function cgst_percent(t) {
    let mainParent = t.parentNode.parentNode.parentNode;
    if (t.value.endsWith("%") == false) t.value = `${t.value}%`;
  }
  //calculate amount for each product
  function calculate_amount(t) {
    let mainParent = t.parentNode.parentNode.parentNode;
    let qty = mainParent.children[3].children[0].children[0].value;
    let rate = mainParent.children[4].children[0].children[0].value;
    if (
      mainParent.children[5].children[0].children[0].value.endsWith("%") == false
    )
      mainParent.children[5].children[0].children[0].value = `${mainParent.children[4].children[0].children[0].value}%`;
    let discount = mainParent.children[5].children[0].children[0].value;
    discount = discount.slice(0, discount.length - 1);
    let cgst = mainParent.children[6].children[0].children[0].value;
    cgst = cgst.slice(0, cgst.length - 1);
    
    let sgst = cgst;
    let amount = parseInt(qty) * (parseInt(rate) - ((parseInt(discount) * parseInt(rate)) / 100) + (((parseInt(cgst) + parseInt(sgst)) * parseInt(rate)) / 100));
    mainParent.children[9].children[0].innerHTML = `₹ ${amount.toFixed(2)}`;

  }
  
  $(document).ready(function () {
    //add line item
    $("#add_line_item").click(function () {
      $("#item_table").append(`<tr class="items">
          <td class="sl_no" style="padding-left: 15px;padding-top: 14px;">${$(".items").length + 1}</td>
          <td>
              <div>
                  <input type="text" class="form-control product_name">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control product_name">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control text-center qty" onchange="calculate_amount(this)">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control text-center rate" onchange="calculate_amount(this)">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control text-center discount" onchange="calculate_amount(this)">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control text-center cgst" onkeyup="cgst_percent(this)"  onchange="calculate_amount(this)">
              </div>
          </td>
          <td>
              <div>
                  <input type="text" class="form-control text-center cgst" onkeyup="copy_to_igst(this)"  onchange="calculate_amount(this)">
              </div>
          </td>
          <td style="padding-top: 7px;">
              <div class="igst text-center">
  
              </div>
          </td>
          <td>
              <div class="amount text-end" style="display: none"></div>
          </td>
      </tr>`);
    });
  
    //remove line item
    $("#remove_line_item").click(function () {
      $(".items:last-child").remove();
    });
  
    //calculate total amount
    $("#cal_total").click(function () {
      let total_amount = 0;
      for (let i of $(".amount")) {
        total_amount =
          total_amount + parseFloat(i.innerHTML.slice(2, i.innerHTML.length));
      }
      $("#total_amount").val(total_amount.toFixed(2));
      console.log($("#total_amount").val(total_amount.toFixed(2)));
    });
  
    //generate bill
    $("#generate_bill").click(function () {
        var frm = $("#myForm");
        frm.submit(function (ev) {
        console.log('in submit');
            ev.preventDefault();
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                success: function (data) {
                    alert("Data Uploaded");
                },
                    error: function(xhr, desc, err){
                        console.log(err);
                    }
            });
        });
      //scrolling window to top
      window.scrollTo(0, 0);
      //removing generate bill button
      $("#generate_bill").css("display", "none");
      // removing modify print button
      $("#modify_print_button").css("display", "");
      //removing add remove button
      $("#add_remove_button").css("display", "none");
      //removing cal_total button
      $("#cal_total_button").css("display", "none");
      //removing form-control class' border
      $(".form-control").addClass("remove-color").removeClass("add-color").attr("placeholder","");
    });
  
    //modify_bill
    $("#modify_bill").click(function () {
      //scrolling window to top
      window.scrollTo(0, 0);
      //adding generate bill button
      $("#generate_bill").css("display", "");
      // adding modify print button
      $("#modify_print_button").css("display", "none");
      //adding add remove button
      $("#add_remove_button").css("display", "");
      //adding cal_total button
      $("#cal_total_button").css("display", "");
      //adding form-control class' border
      $(".form-control").addClass("add-color").removeClass("remove-color");
    });
  
    //print bill
    $("#print_bill").click(function () {
      // removing modify print button
      $("#modify_print_button").css("display", "none");
      //print operation
      window.print();
      // removing modify print button
      $("#modify_print_button").css("display", "");
    });
  });