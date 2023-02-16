import React from "react";

interface INav {
    handleClick: (arg: string) => void;
}

export const Nav = ({ handleClick } :INav ) => {

    const toc: object = {
        'Northern': 'northern',
        'Transpennine Express': 'tpe',
        'Merseyrail': 'merseyrail',
        'Transport for Wales': 'tfw',
        'East Midlands Railway': 'emr',
      }

    const tocArr = Object.entries(toc);

    const nav = tocArr.map((indToc,i) => (
        <button key={i} onClick={() => handleClick(`${indToc[1]}`)}>{indToc[0]}</button>
      ))

    return(
        // needs to be in a fragment as it returns a array of elements
        <>    
            {nav}
        </>
    )
}