window.onload = function() {

    var dispatcher = new cf.EventDispatcher();
    dispatcher.addEventListener(cf.FlowEvents.USER_INPUT_UPDATE, function(event) {
    var userInput = event.detail.tag._values[0]
    console.log(userInput)
  },
  false
);


    var conversationalForm = new window.cf.ConversationalForm.startTheConversation({
      formEl: document.getElementById("form"),
      context: document.getElementById("cf-context"),
      robotImage: ("assets/img/kwesi2.png"),
      userImage: ("assets/img/user1.png"),
      eventDispatcher: dispatcher,
      submitCallback: function() {
        // var formData = conversationalForm.getFormData();
        var formDataSerialized = conversationalForm.getFormData(true);
        // console.log(formData);
        console.log(formDataSerialized);


        if (formDataSerialized['cfc-services'] == "bank-settings" ){
          if (formDataSerialized['cfc-bank-settings'] == 'block-card') {
            var card = formDataSerialized['block-card-card']
            var message = `Card number ${card} has been blocked`
          }
  
          else if (formDataSerialized['cfc-bank-settings'] == 'travel-notification') {
            var date = formDataSerialized['travel-notification-date']
            var message = `Your travel notification has been set on ${date}`
          }
  
          else if (formDataSerialized['cfc-bank-settings'] == 'spend-limit') {
            var amount = formDataSerialized['spend-limit-amount']
            var card = formDataSerialized['spend-limit-card']
            var message = `The spend limit for card ${card} has been set to GH${amount}`
          }
  
          else if (formDataSerialized['cfc-bank-settings'] == 'freeze-account') {
            var account = formDataSerialized['freeze-account-account']
            var message = `The account ${account} has been frozen`
          }
  
          else {
            var message = 'Done!'
          }
        }

        else{
          if (formDataSerialized['cfc-services'] == 'check-balance'){
            var message = 'You have a balance of GH50000'
          }
  
          else if (formDataSerialized['cfc-services'] == 'transfer-money') {
            var amount = formDataSerialized['transfer-money-amount']
            var recipient = formDataSerialized['transfer-money-recipient']
            var message = `An amount of ${amount} has been transfered to ${recipient}`
          }
          else {
            var message = 'Done!'
          }
        }

  
        conversationalForm.addRobotChatResponse(message);
        conversationalForm.remapTagsAndStartFrom(1,1,true);

      }

    });

  };