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
        const api = await fetch(
             `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        );
        const data = await api.json();
        console.log(data.recipes);
        setPopular(data.recipes);
    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide
                    options={{
                        perPage: 4,
                        arrows: false,
                        paginations: false,
                        drag: "free",
                        gap: "5rem"
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

const Card = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  width: 90%;
  height: 15rem;

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


export default Popular