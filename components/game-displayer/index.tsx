import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button,
} from "reactstrap";
import GamesInfoJSON from "../../GamesInfo.json";
import Loader from "react-loader-spinner";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface photo {
  src: string;
  altText: string;
}

interface GameInfo {
  photos: photo[];
  iconURL: string;
  title: string;
  description: string;
  link: string;
}

class SerializeHelper {
  static GetGameInfo(json: string): Array<GameInfo> {
    var info: Array<GameInfo> = JSON.parse(json)["games"];
    return info;
  }
}

export default () => {
  var games = SerializeHelper.GetGameInfo(JSON.stringify(GamesInfoJSON));

  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [activeIndex, setActivePhotoIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  let gameSelected = games[activeGameIndex];

  useEffect(() => {
    console.log("Nuevo index: " + activeGameIndex);
  }, [activeGameIndex]);

  const previousGame = () => {
    setActivePhotoIndex(0);
    const nextIndex =
      activeGameIndex === 0 ? games.length - 1 : activeGameIndex - 1;
    setActiveGame(nextIndex);
  };

  const nextGame = () => {
    setActivePhotoIndex(0);
    const nextIndex =
      activeGameIndex === games.length - 1 ? 0 : activeGameIndex + 1;
    setActiveGame(nextIndex);
  };

  const setActiveGame = (activeIndex) => {
    var photoImage = new Image();
    photoImage.src = games[activeIndex].photos[0].src;
    setAnimating(true);

    photoImage.onload = () => {
      var iconoImage = new Image();
      iconoImage.src = games[activeIndex].iconURL;
      iconoImage.onload = () => {
        setAnimating(false);
        setActiveGameIndex(activeIndex);
      };
    };
  };

  const nextPhoto = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === games[activeGameIndex].photos.length - 1
        ? 0
        : activeIndex + 1;
    setActivePhotoIndex(nextIndex);
  };

  const previousPhoto = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0
        ? games[activeGameIndex].photos.length - 1
        : activeIndex - 1;
    setActivePhotoIndex(nextIndex);
  };

  const goToIndexPhoto = (newIndex: number) => {
    if (animating) return;
    setActivePhotoIndex(newIndex);
  };

  const onIconClicked = () => {
    if (games[activeGameIndex].link === "") return;
    var win = window.open(games[activeGameIndex].link, "_blank");
    win?.focus();
  };

  const slides = games[activeGameIndex].photos.map((item) => {
    return (
      <CarouselItem className="carousel-item" key={item.src}>
        <img
          src={item.src}
          alt={item.altText}
          className="img-fluid"
        />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  const gameInfoDisplay = () => {
    if (!animating)
      return (
        <div>
          <div className="title">
            <h1>{gameSelected.title}</h1>
          </div>
          <div className="page-description">
            <h2>{gameSelected.description}</h2>
          </div>
          <div className="carousel">
            <Carousel
              activeIndex={activeIndex}
              next={nextPhoto}
              previous={previousPhoto}
              ride="carousel"
              slide={true}
            >
              <CarouselIndicators
                items={gameSelected.photos}
                activeIndex={activeIndex}
                onClickHandler={goToIndexPhoto}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previousPhoto}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={nextPhoto}
              />
            </Carousel>
          </div>
        </div>
      );
    else {
      return (
        <div className="spin-loading">
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            visible={animating}
            timeout={3000}
          />
        </div>
      );
    }
  };

  const gameSelector = () => {
    return (
      <div className="head-info">
        <div className="btn-left">
          <Button onClick={previousGame}>
            <FontAwesomeIcon icon={faArrowLeft} width="20px"/>
          </Button>
        </div>
        <div>
          <img
            src={gameSelected.iconURL}
            alt="Un juego de HydeKyle"
            onClick={onIconClicked}
            className="icon"
          />
        </div>
        <div className="btn-right">
          <Button onClick={nextGame}>
            <FontAwesomeIcon icon={faArrowRight} width="20px" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="main-content">
      {gameSelector()}
      {gameInfoDisplay()}
    </div>
  );
};
