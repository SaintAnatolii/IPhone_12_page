document.addEventListener('DOMContentLoaded', ()=>{

    
    // modal
    const modal = () => {
        const modal = document.querySelector('.modal');
        const modalClose = document.querySelector('.modal__close');
        const buttonBuy = document.querySelectorAll('.button_buy');

        buttonBuy.forEach((button) => {
            button.addEventListener('click', ()=> {
                modal.classList.add('open');
            });
        })
        
        modal.addEventListener('click', (e)=> {
            const target = e.target;
            // console.log(target);
            if (target === modal || target === modalClose) {
                modal.classList.remove('open');
            }
        });

    };

    // tab

    const tabs = () => {
        const cardDetailChange = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitle = document.querySelectorAll('.card-details__title');
        const cardImage = document.querySelectorAll('.card__image');

        // скрывать все табы
        const hideAll = () => {
            for (let i = 0; i < cardDetailChange.length; i++) {
                cardDetailChange[i].classList.remove('active');
                cardDetailsTitle[i].classList.remove('active');
                cardImage[i].classList.remove('active');
            };
        };

        for (let i = 0; i < cardDetailChange.length; i++) {
            cardDetailChange[i].addEventListener('click', ()=> {
                hideAll();
                cardDetailChange[i].classList.add('active');
                cardDetailsTitle[i].classList.add('active');
                cardImage[i].classList.add('active');
            });
        };
    };

 
    const accordion = () => {
        const characteristicsList = document.querySelector('.characteristics__list');
        const characteristicsItem = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) => {
            closeAllDropDown();
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add('active');
            dropDown.classList.add('active');
        };
        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = ``;
        };


        const closeAllDropDown = (button, dropDown) => {
            characteristicsItem.forEach((elem)=> {
                if (elem.children[0] !== button && elem.children[0] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        };

        characteristicsList.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }
        });

        setTimeout(closeAllDropDown, 3000);

    };


    // cross sell

    // const getData = (url, func) => {
    //     const request = new XMLHttpRequest();
    //     request.open('GET', url);
    //     request.addEventListener('readystatechange', ()=> {
    //         if (request.readyState !== 4) return;
    //         if (request.status === 200) {
    //             const response = JSON.parse(request.response);
    //             func(response);
    //         } else {
    //             console.log(new Error('Ошибка: ' + request.status));
    //         };
    //     });

    //     request.send();
    // };

    // const renderCrossSell = () => {
    //     const crossSellList = document.querySelector('.cross-sell__list');

    //     const createCrossSellItem = (good) => {
    //         const liItem = document.createElement('li');

    //         liItem.innerHTML = `
    //             <article class="cross-sell__item">
    //                 <img class="cross-sell__image" src="${good.photo}" alt="">
    //                 <h3 class="cross-sell__title">${good.name}</h3>
    //                 <p class="cross-sell__price">${good.price}</p>
    //                 <div class="button button_buy cross-sell__button">Купить</div>
    //             </article>
    //         `;

    //         return liItem;
    //     };

    //     const createCrossSellList = (goods) => {
    //         goods.forEach(item => {
    //             crossSellList.append(createCrossSellItem(item))
    //         });
    //     };

    //     getData('cross-sell-dbase/dbase.json', createCrossSellList)
    // };

    const getData = async (url) => {
        const data = await fetch(url);
        const goods = await data.json();

        console.log(goods);

        const crossSellList = document.querySelector('.cross-sell__list');

        goods.forEach((good) => {
            const liItem = document.createElement('li');

            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${good.photo}" alt="">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price}</p>
                    <div class="button button_buy cross-sell__button">Купить</div>
                </article>
            `;

            crossSellList.append(liItem);
        });


    };

    // getData('cross-sell-dbase/dbase.json');

    tabs();
    accordion();
    modal();

    const moreBtn = document.querySelector('.more');
    moreBtn.addEventListener('click', ()=> {
        getData('cross-sell-dbase/dbase.json');
        moreBtn.style.display = 'none';
    });
    
    

});