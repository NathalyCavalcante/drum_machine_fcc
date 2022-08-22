import './App.css';
import React from 'react';

const sounds = [
  {
    key: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const App = () => (  
    <div id="drum-machine">
        <div id="display" className="display">
          <h1>Play a sound!!</h1>
            {sounds.map((sound, idx)  => (
            <DrumPad text={sound.key} key={idx} audio={sound.url} />))}
        </div>
    </div>
 );
  
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
        this.audio = React.createRef();
  }

  componentDidMount() {
    this.audio.current.addEventListener("ended", (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove("active");
    });
  }

  playSound = () => {
    this.audio.current.play();
    const id = this.audio.current.id;

    const parent = this.audio.current.parentNode;
    parent.classList.add("active");

    const display = parent.parentNode;
     display.querySelector("h1").innerText = `${id} is playing!`;
  
      }

  render() {
    
    const { text, audio } = this.props;

    return (
      
      <div id={`drum-${text}`} className="drum-pad" onClick={this.playSound}>
      {text}
      <audio className="clip" src={audio} id={text} ref={this.audio} />
      </div>
    
    )
  }
}

document.addEventListener('keydown', (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);

  if (audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add("active");
    
   const display = parent.parentNode;
    display.querySelector("h1").innerText = `${id} is playing!`;
    
    audio.play();
  }
});
    
    
export default App;
