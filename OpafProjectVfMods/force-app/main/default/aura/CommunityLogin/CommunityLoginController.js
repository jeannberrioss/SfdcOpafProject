({
doInit : function(component, event, helper) {
    var urlString = window.location.href;
    var baseURL = urlString.substring(0, urlString.indexOf("/s"));
    var url;
    if(baseURL.indexOf('Patient')>=0){
        component.set('v.communityHeader','Welcome To the OPAF Care Connect Patient Portal');
        component.set('v.communityFooter','OPAF Care Connect Patient Portal');
        component.set('v.isPatient',true);
        url = $A.get('$Resource.PatientPortalBackground'); 
    }
    else{ component.set('v.communityHeader','Welcome To the OPAF Care Connect Prescriber Portal');
         component.set('v.communityFooter','OPAF Care Connect Prescriber Portal');
         var url = $A.get('$Resource.OPAF_Care_Connect_BGImage');
    }
    component.set('v.backgroundImageURL', url);
    component.set("v.isSelfRegistrationEnabled", helper.getIsSelfRegistrationEnabled(component, event, helper));
    component.set("v.communitySelfRegisterUrl", helper.getCommunitySelfRegisterUrl(component, event, helper));
    component.set("v.communityForgotPasswordUrl", helper.getCommunityForgotPasswordUrl(component, event, helper));
    //component.set('v.communityHeader',helper.getCustomSettings(component, event, helper));
},
getInput: function (component,event, helper) { 
component.set("v.mylabel1","");
var validForm = component.find('FormVal').reduce(function (validSoFar,inputCmp) {
// Displays error messages for invalid fields
inputCmp.showHelpMessageIfInvalid();
return validSoFar && inputCmp.get('v.validity').valid;
}, true);
// If we pass error checking, do some real work
if (validForm) {
 
// Get the Username from Component
var user = component.get("v.Username");
var Pass = component.get("v.Password");
//Calling controller
// Create the action
var action = component.get("c.checkPortal");
action.setParams({
username: user,
password: Pass
});
// Add callback behavior for when response is received
action.setCallback(this,
function (response) {
var state = response.getState();
var rtnValue =response.getReturnValue();
   
if (rtnValue !==null) {
component.set("v.mylabel",rtnValue);
//component.set("v.showError",true);
}
});
 
// Send action off to be executed
$A.enqueueAction(action);
}
},
resetPass: function (cmp) {
cmp.set("v.mylabel1", "");
 
cmp.set("v.isVisible",
false);
},
 
CancelReset: function (cmp) {
cmp.set("v.mylabel", "");
 
cmp.set("v.isVisible", true);
},
submitresetPass: function (
component, event, helper) {
component.set("v.mylabel",
"");
 
var validResetForm1 =
component.find(
"FormReset").get(
"v.validity");
// If we pass error checking, do some real work
if (validResetForm1.valid) {
var Reuser1 = component.get(
"v.ResetUsername");
var action = component.get(
"c.forgotPassowrd"
);
action.setParams({
username: Reuser1
});
action.setCallback(this,
function (a) {
var rtnValue =
a.getReturnValue();
console.log(
'<<my return value>>>>>' +
rtnValue);
// component.set("v.mylabel1",'We’ve sent you an email with a link to finish resetting your password.');
 
if (rtnValue !==
null) {
component.set(
"v.mylabel1",
rtnValue
);
// component.set("v.showError",true);
}
});
$A.enqueueAction(action);
}
},
handleLogin: function (component,
event, helpler) {
var username = component.find(
"Username").get(
"v.Username");
var password = component.find(
"password").get(
"v.value");
helpler.handleLogin(
username, password);
},
setStartUrl: function (component,
event, helpler) {
var startUrl = event.getParam(
'startURL');
if (startUrl) {
component.set(
"v.startUrl",
startUrl);
}
},
 
// this function automatic call by aura:waiting event
showSpinner: function (component,
event, helper) {
// make Spinner attribute true for display loading spinner
component.set("v.Spinner",
true);
},
 
// this function automatic call by aura:doneWaiting event
hideSpinner: function (component,
event, helper) {
// make Spinner attribute to false for hide loading spinner
component.set("v.Spinner",
false);
},
    createNewUser : function(component, event, helper){
        component.set("v.Spinner",true);
    	var communitySelfRegisterUrl = component.get("v.communitySelfRegisterUrl");
        if(communitySelfRegisterUrl == null){
        	window.open(component.get("v.selfRegisterUrl"), '_self');    
        }else{
        	window.open(component.get("v.communitySelfRegisterUrl"), '_self');    
        }
    }
})