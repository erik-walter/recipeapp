import { useEffect, useState } from "react"
import styled from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'


function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    },[]);

    const getPopular = async () => {
        const check = localStorage.getItem('popular');
    
        if (check && check !== "undefined") {
            try {
                setPopular(JSON.parse(check));
            } catch (error) {
                console.error('Fehler beim Parsen von localStorage:', error);
                localStorage.removeItem('popular');
            }
        } else {
            try {
                const api = await fetch(
                    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`
                );
    
                if (api.status === 429) {
                    console.error("Too many requests! Bitte warte bis morgen oder kontrolliere dein API-Limit.");
                    return;
                }
    
                if (!api.ok) {
                    console.error("Fetch Fehler:", api.status, api.statusText);
                    return;
                }
    
                const data = await api.json();
    
                if (data.recipes) {
                    localStorage.setItem('popular', JSON.stringify(data.recipes));
                    setPopular(data.recipes);
                } else {
                    console.error('API Antwort enthält keine Rezepte!', data);
                }
            } catch (error) {
                console.error('Netzwerk oder andere Fehler:', error);
            }
        }
    };
    

    const clearPopular = () => {
        localStorage.removeItem('popular');
        getPopular();
    };

    return (
        <div>
            <Wrapper>
                <Header>
                <h3>Popular Recipes</h3>
                <ClearButton onClick={clearPopular}>
                    Show new popular recipes
                </ClearButton>
                </Header>
                <Splide
                    options={{
                        perPage: 5,
                        arrows: false,
                        paginations: false,
                        drag: "free",
                        gap: "2.5rem"
                    }}
                >
                    {popular.map((recipe) => {
                        return(
                            <SplideSlide>
                                <Card>
                                    <p>
                                        {recipe.title}
                                    </p>
                                    <img src={recipe.image} alt={recipe.title}/>
                                </Card>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    margin: 0;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  margin: 0;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Der dunkle Overlay-Verlauf */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));
    z-index: 1;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    padding: 0 1rem;
    line-height: 1.2;
  }
`;

const ClearButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.4rem 1rem; /* kleineres Padding */
  margin-left: 1rem;
  border-radius: 0.8rem;
  font-size: 1rem; /* evtl. etwas kleiner machen */
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff4c4c;
  }
`;

export default Popular