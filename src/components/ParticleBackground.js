import React from 'react';
import Particles from 'react-tsparticles';
import {loadFull} from 'tsparticles'

const Particless = () =>{
    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
      };
      const particlesLoaded = (container) => {
        console.log(container);
      };
    return(
        <div>
<Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
              options={{
            fpsLimit: 40,
            interactivity: {
              detectsOn: 'canvas',
             
            },
            particles: {
              color: {
                value: "#f1f1f1"
              },
              number: {
                density: {
                  enable: true,
                  area: 1080
                },
                limit: 0,
                value: 500,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.5,
                  speed: 3,
                 
                },
                random: {
                  enable: true,
                  minimumValue: 0.1,
                },
               
              },
              shape: {
                type: 'circle',
       
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 0.5
                },
                value: 1
              }
            }
          }}
      />  
        </div>
    );

}
export default React.memo(Particless);