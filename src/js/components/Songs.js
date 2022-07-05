import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Songs{
  constructor(id , data){
    const thisSong = this;
    thisSong.id = id;
    thisSong.data = data;
    thisSong.renderInMenu();
    console.log('data', data);
  }

  renderInMenu(){
    const thisSong = this;

    const generatedHTML = templates.playerBox(thisSong.data);   

    thisSong.element = utils.createDOMFromHTML(generatedHTML);    
    
    const songContainer = document.querySelector(select.containerOf.player);

    songContainer.appendChild(thisSong.element);

  }
  


}
export default Songs;