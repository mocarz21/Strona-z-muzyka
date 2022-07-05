import { settings, templates, select } from '../settings.js';
import utils from '../utils.js';

class Search{
  constructor(songNameHolder, data){
    const thisSearch = this;
    thisSearch.data = data;
    thisSearch.getDate(songNameHolder);
    
  }

  initGreenAudioPlayer(){

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

  }

  

  getDate(songNameHolder){
    const thisSearch = this;

    thisSearch.data ={};

    const urlName = settings.db.url + '/songs?' + settings.db.searchName + songNameHolder; //jak wyszukiwac po czesci znakow w title a nie dokładnie musze wpisac tytuł
    
    fetch(urlName)
    
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisSearch.data.songs = parsedResponse;
        
        thisSearch.renderInSearch(thisSearch.data.songs[0]);
        thisSearch.initGreenAudioPlayer();
      });

    

  }
  renderInSearch(music){
    const thisSearch = this;

    const generatedHTML = templates.playerBox(music);   

    thisSearch.element = utils.createDOMFromHTML(generatedHTML);    

    const songContainer = document.querySelector(select.containerOf.searchBox);

    songContainer.appendChild(thisSearch.element);
    
  }

  //make template to page search

  
}
export default Search;