let dreamType = document.querySelectorAll('.dreamType')

// console.log(dreamType[0].innerHTML)


dreamType.forEach(element =>{
    if(element.innerText == 'badDream'){
        const bDreamImgs = ['url(/img/b1.png)','url(/img/b2.png)','url(/img/b3.png)','url(/img/b4.png)']
        let randomBDreamImg = bDreamImgs[Math.floor(Math.random() * bDreamImgs.length)];
        element.closest('section').style.backgroundImage = randomBDreamImg
    }else if(element.innerText == 'goodDream'){
        const gDreamImgs = ['url(/img/g1.png)','url(/img/g2.png)','url(/img/g3.png)','url(/img/g4.png)']
        let randomGDreamImg = gDreamImgs[Math.floor(Math.random() * gDreamImgs.length)];
        element.closest('section').style.backgroundImage = randomGDreamImg
    }else if(element.innerText == 'neutralDream'){
        const nDreamImgs = ['url(/img/n1.png)','url(/img/n2.png)','url(/img/n3.png)','url(/img/n4.png)']
        let randomNDreamImg = nDreamImgs[Math.floor(Math.random() * nDreamImgs.length)];
        element.closest('section').style.backgroundImage = randomNDreamImg
    }
})