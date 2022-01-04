;(function (){
    

const formElm = document.querySelector('form');
const nameInputElm = document.querySelector('#input');
const listGroupElm = document.querySelector('.list-group');
const filterElm = document.querySelector('#filter');
const editElm = document.querySelector('#editTweet');


// tracking item;
let tweets = [
    // {
    //    id: 0,
    //    name: 'potato',
    // },
    // {
    //   id: 1,
    //   name: 'banana',
    // },
    // {
    //     id: 2,
    //     name: 'alu',
    // }
];





function showAllTweetsToUI(tweetsMessage){
    listGroupElm.innerHTML = '';
   tweetsMessage.forEach(tweet => {
    const listElm = `<li class="list-group-item tweet-${tweet.id} collection-item">
    <strong>${tweet.name}</strong>
    <i class="fa fa-trash float-right delete-tweets"></i>
  </li>`

  listGroupElm.insertAdjacentHTML('afterbegin', listElm);

   })
}

function updateAfterRemove(tweets,id){
    return tweetsAfterDelete = tweets.filter(tweet => tweet.id !== id);

}
 function removeTweetFromDataStore(id){
     //console.log(tweet)
//   const tweetsAfterDelete = tweets.filter(tweet => tweet.id !== id);
 const tweetsAfterDelete = updateAfterRemove(tweets,id);
  tweets = tweetsAfterDelete;
  //console.log(tweetsAfterDelete);

 }
 function populateUIInEditState(tweets){
     editElm.value = tweets.name;
    //  priceInputElm.value = tweet.price;
 }
  function removeTweetFromUI(id){
      document.querySelector(`.tweet-${id}`).remove()
      //tweets = tweetsAfterDelete;s
  }

  function getTweetsId(elm){
      const liElm = elm.parentElement
      return Number(liElm.classList[1].split('-')[1]);
    //   console.log(Number(liElm.classList[1].split('-')[1]));
        //console.log(elm);
  }
function resetInput(){
    nameInputElm.value = '';
}

function addTweetsToUI(id, name){
    // generate issue.
    const listElm = `<li class="list-group-item tweet-${id} collection-item">
    <strong>${name}</strong>
    <i class="fa fa-trash float-right delete-tweets"></i>
    <i class="fa fa-pencil-alt edit-tweets float-right"></i>

  </li>`

  listGroupElm.insertAdjacentHTML('afterbegin', listElm);


}

function validateInput (name){
    isError = false;
    if (!name || name.length >= 250){
        isError = true;
        //console.log('invalid name input');
    }
    //console.log(price, typeof price);
    // if(!price || isNaN(price) || Number(price)<=0){
    //     isError = true;
    // }
    // if(!price || Number(price)<=0){
    //     isError = true;
    // }
    return isError;
}

function receivedInputs() {
   // console.log(nameInputElm.value);
    const nameInput = nameInputElm.value;
    return {
        nameInput,
    };
    console.log(nameInput);
}


function addTweetsToStorage(tweet) {
    let tweets;
    if(localStorage.getItem('storeTweets')){
       tweets = JSON.parse(localStorage.getItem('storeTweets'));
       tweets.push(tweet);
       // update to localStorage;
       localStorage.setItem('storeTweets',JSON.stringify(tweets));


    }else{
        let tweets = [];
        tweets.push(tweet);
               // update to localStorage;

        localStorage.setItem('storeTweets',JSON.stringify(tweets));

    }
    

}
function removeTweetFromStorage(id){
    //const tweets = updateAfterRemove(id);
    //pick from LocalStorage;
    const tweets = JSON.parse(localStorage.getItem('storeTweets'));
    //filter;
    const tweetsAfterRemove = updateAfterRemove(tweets, id);
    //save data to localStorage;
    localStorage.setItem('storeTweets',JSON.stringify(tweetsAfterRemove));
    console.log(id);
}
// function removeTweetFromStorage (){
//         //const tweets = updateAfterRemove(id);
//          // pick from local storage;
//     const tweets = localStorage.getItem('storeTweets');
//     // filter
       // updateAfterRemove(tweets, id);
//     //console.log(id);
// }



// single responsibility principle.

function init(){
    formElm.addEventListener('submit',(evt) => {
        // console.log('triggerd');
         //prevent default action(browser, relLoading);
        evt. preventDefault();
        // receiving input;
        const {nameInput} = receivedInputs();
        //console.log(nameInput);
     
        // validate input;
       const isError =  validateInput(nameInput);
       if(isError){
           alert('please provide valid input')
           return 
       }
       //console.log(isError);
       if(!isError){
           // add item to data store.
           // generate tweets.
     
           const id = tweets.length;
           const tweet = {
            id: id,
            name: nameInput,
        }
            tweets.push(tweet);
           //add item to the UI;
           addTweetsToUI(id,nameInput);
          // console.log(tweets);
       
          //add tweets to data store;
          addTweetsToStorage(tweet);
           // reset the input item.
           resetInput();
       }
       //console.log(isError);
         //console.log(inputValues);
     })
     
     filterElm.addEventListener('keyup', (evt) => {
         // filter depend on this value;
         const filteredValue = evt.target.value;
         const filteredArr = tweets.filter(tweet =>  
             tweet.name.includes(filteredValue)
         )
         showAllTweetsToUI(filteredArr);
         // show Item to UI;
     
         //console.log(result);
        // console.log(evt.target.value);
     })
     // deleting item(event delegation);
  listGroupElm.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('delete-tweets')){
        const id = getTweetsId(evt.target);
       /// console.log('delete-tweets');
     // console.log(id);
     // delete item form UI;
     removeTweetFromUI(id);
  //    document.querySelector(`.tweet-${id}`).remove();
  // delete tweet from data store;

     removeTweetFromDataStore(id);
     // delete item form storage
     removeTweetFromStorage(id);
    }else if(evt.target.classList.contains('edit-tweets')){
        //pick the tweets id;
        const id = getTweetsId(evt.target);

       // console.log(id);
        //find the tweets;
        const foundTweet = tweets.find(tweet => tweet.id === id);
        //console.log(foundTweet);
        //populate the tweets data to UI;
        populateUIInEditState(foundTweet);
        //show updated button;
        //updating the data (from user);
        //updated the should be updated to data store;
        //updated data should de updated to UI;
        //updated data should be updated to localStorage; 
        //console.log('Edit Tweets');
    }
    document.addEventListener('DOMContentLoaded',(e)=>{
        //checking tweet into localStorage.
        if(localStorage.getItem('storeTweets')){
            tweets = JSON.parse(localStorage.getItem('storeProducts'))
            //const tweets = JSON.parse(localStorage.getItem('storeTweets'))
            //show tweet to UI;
            showAllTweetsToUI(tweets);
            //populate temporary data store;
            // tweets = tweets;
            //console.log(tweets);
        }
    })

})
}

init();

})();