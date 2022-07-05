import {settings, templates, select } from '../settings.js';
import utils from '../utils.js';
class Discover{
  constructor(data){
    const thisDiscover = this;
    thisDiscover.data = data;
    thisDiscover.maxId();
  }

  initGreenAudioPlayer(){



    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

  }

  maxId(){
    const thisDiscover = this;
    let max = ' ';
    for( let id in thisDiscover.data){ 
      
      max =Math.max(max,thisDiscover.data[id].id);
    } 
    
    thisDiscover.random(max);
  }

  random(max){
    const thisDiscover =this;
    let randomId = Math.floor(Math.random() * max + 1);

    thisDiscover.getDate(randomId);
  }
  getDate(randomId){
    const thisDiscover = this;

    thisDiscover.data ={};

    const urlName = settings.db.url + '/songs?' + settings.db.searchId + randomId; //jak wyszukiwac po czesci znakow w title a nie dokładnie musze wpisac tytuł
    
    fetch(urlName)
    
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisDiscover.data.songs = parsedResponse;

        thisDiscover.renderInDiscover(thisDiscover.data.songs[0]);
        thisDiscover.initGreenAudioPlayer();
      });

  }
  renderInDiscover(music){
    const thisSearch = this;

    const generatedHTML = templates.playerBox(music);   

    thisSearch.element = utils.createDOMFromHTML(generatedHTML);    


    const songContainer = document.querySelector(select.containerOf.discoverBox);

    songContainer.appendChild(thisSearch.element);
    
  }

}
export default Discover;