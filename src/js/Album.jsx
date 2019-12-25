import React from 'react';
import styled from 'styled-components';
import Track from './Track';

const Album = props => {
    const { name, coverUrl, year, tracks, tracksVisible, index, showTracksHandler, hideTracksHandler, showCoverZoomHandler, showLyricsHandler } = props;

    return (
        <Item>
            <Title>{name} ({year})</Title>
            <CoverWrapper>
                <CoverImg src={coverUrl} alt={`'${name}' album cover`} />
                <Overlay>
                    {tracksVisible ?
                        <OverlayItem onClick={() => hideTracksHandler(index)} type='button'>Hide tracks</OverlayItem>
                        :
                        <OverlayItem onClick={() => showTracksHandler(index)} type='button'>Show tracks</OverlayItem>
                    }
                    <OverlayItem onClick={() => showCoverZoomHandler(index)} type='button'>Zoom cover</OverlayItem>
                </Overlay>
            </CoverWrapper>

            <Tracks>
                {tracksVisible && tracks.map((track, index) => (
                    <Track
                        key={parseInt(index, 10)}
                        number={parseInt(index) + 1}
                        name={track}
                        showLyricsHandler={showLyricsHandler}>
                    </Track>
                ))}
            </Tracks>
        </Item>
    );
};

export default Album;

const Item = styled.li`
    list-style: none;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1em;
    text-align: center;
`;

const CoverImg = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    filter: grayscale(1);
    transition: filter ease-in-out 250ms;

    ${Item}:hover & {
        filter: grayscale(0);
        transition: filter ease-in-out 250ms;
    }
`;

const CoverWrapper = styled.div`
    position: relative;
`;

const Tracks = styled.ul`
    padding-left: 0;
`;

const Overlay = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.7);
    opacity: 0;
    transition: opacity ease-in-out 250ms;

    ${CoverWrapper}:hover & {
        opacity: 1;
        transition: opacity ease-in-out 250ms;
    }
`;

const OverlayItem = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    font-family: 'Oswald', sans-serif;
    font-size: 1em;
    outline: none;
    border: 0;

    &:first-child,
    &:first-child:active {
        border-right: 1px solid #999;
    }
`;