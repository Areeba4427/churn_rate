var slider = document.getElementById("range3");

function slider_cal() {
  $("#rate").html(slider.value + "%");
  var total = parseInt(document.getElementById("total-users").value);
  var lost = parseInt(document.getElementById("lost-users").value);
  var account_value = parseFloat(
    document.getElementById("monthly-value").value
  );
  var old_churn_rate = (lost / total) * 100;
  var lost_revenue = lost * account_value;
  var new_rate = (old_churn_rate / 100) * (1 - slider.value / 100) * 100;
  var recovered = (new_rate * total) / 100;
  var lost_revenue_new = recovered * account_value;
  var tot = lost_revenue - lost_revenue_new;

  document.getElementById("recovered-monthly-rev").textContent =
    formatter.format(tot);
  document.getElementById("recovered-annual-rev").textContent =
    formatter.format(tot * 12);
}

slider.addEventListener("input", slider_cal);
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function cal_churn() {
  var total = parseInt(document.getElementById("total-users").value);
  var lost = parseInt(document.getElementById("lost-users").value);
  var account_value = parseFloat(
    document.getElementById("monthly-value").value
  );
  var churn_rate = (lost / total) * 100;
  document.getElementById("churn-rate").value = churn_rate.toFixed(2) + "%";
  console.log(churn_rate);
  var lost_revenue = lost * account_value;
  document.getElementById("lost-revenue").value =
    "-" + formatter.format(lost_revenue);
  slider_cal();
}
var shareMessage = document.getElementById("share-message");

function generateShareLink() {
  const pageUrl = window.location.href;
  const shareUrl = `https://areeba4427.github.io/churn_rate/`;
  //   window.prompt("Copy the link below:", shareUrl);
  copyToClipboard(shareUrl);
}

function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  shareMessage.classList.remove("hidden");
  setTimeout(() => {
    shareMessage.classList.add("hidden");
  }, 2000);
}

var email, firstName , lastName, business , props;
hbspt.forms.create({
  // region:"nal",
  portalId: "6830827",
  formId: "87408a5c-53f3-43ce-b6dd-b26c8193b3bc",
  target: '#form-container',
  cssClass: 'hs-form',
  onFormSubmit: function ($form) {
    var formData = $form.serialize();
	
 
const params = new URLSearchParams(formData);
 firstName = params.get('firstname');
 lastName = params.get('lastname');
 email = params.get('email');

business = {
  
  //Using phone for name field. Since name key is different in font size.
  phone:  firstName + " "+ lastName,
  email: email,
}

//Props is formsubmit function to get updated value of buisness object
props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: "Churn Rate",
  orientationLandscape: true,
  compress: true,
  logo: {
      src: "https://i.ibb.co/Xszmqft/activator-logo-primary.png",
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 70.33, //aspect ratio = width/height
      height: 20.66,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 90 //negative or positive num, from the current position
      }
  },
 
  stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  business,
  invoice: {
      
      header: [

        { 
          title: " ",
          style: {
            width: 70,
            padding: "25px !important",
            fontSize:"30px !important",
            fontWeight: "bold !important"

          } 
        }, 
        { 
          title: " ",
          style: {
            width: 170,
             padding: "25px !important",
             fontSize:"24px !important",
             fontWeight: "bold !important"
          } 
        }, 
        { title: " " , 
        style: {
          width: 50,
          padding: "25px !important",
          fontSize:"40px !important",
          fontWeight: "bold !important"
          
        } },
       
      ],
      table:[
       [
       "The total amount of users\n" ,  
        "The total amount of costumers that pay for your service every month",
         document.getElementById("total-users").value,
         ] , 
         [
          "Lost users last month\n",
          "The total amount of costumers who closed their account last month",
          document.getElementById("lost-users").value,
         ] ,  [
          "Average account monthly value \n",
          "How much on average each account generate sales per month",
          document.getElementById("monthly-value").value,
         ] ,
         [
          "Churn rate \n",
          "Your calculated churn rate for last month",
          document.getElementById("churn-rate").value,
         ] ,
         [
          "Lost revenue due to churn (1 Month) \n",
          "The amount of lost revenue due to churn",
          document.getElementById("lost-revenue").value,
         ] ,
         [
          "\n\nIf the churn rate is improved by "+document.getElementById("range3").value + "% \n\n",
          " ",
          " ",
         ] , 
      
         [
          "Recovered revenue in 1 month\n",
          "Revenue recovered in a month when churn rate improves by "+ document.getElementById("range3").value + "%",
          document.getElementById("recovered-monthly-rev").textContent,
         ] , 
         
         [
          " Recovered revenue in 1 year\n",
          "Revenue recovered in a year when churn rate improves by " + document.getElementById("range3").value + "%",
          document.getElementById("recovered-annual-rev").textContent,
         ] 
    

        ],
     
 },

  footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};


  },

  

});

document.getElementById("download-btn").onclick = function(){

      if (email && firstName && lastName) {
        // Allow download to proceed
        console.log(email , firstName , lastName);
        var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages createiop
      }
      
      else {
        // Alert user to fill out HubSpot form
        alert("Please fill out the form before downloading.");
        return;
      }
    
 console.log("object created", pdfObject);
    }

  
    