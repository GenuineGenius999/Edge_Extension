(() => {

"use strict";


/*
=====================================================
 Fluent Table Enhancer
 Main Content Script
=====================================================
*/


const CONFIG = {

    tableClass: "fte-table",

    wrapperClass: "fte-wrapper",

    numberClass: "fte-number",

    badgeClass: "fte-status",

    processed: "fteProcessed"

};



let extensionEnabled = true;



/*
=====================================================
 Load Settings
=====================================================
*/


chrome.storage.sync.get(
    {
        enabled:true
    },

    (settings)=>{


        extensionEnabled = settings.enabled;


        if(extensionEnabled){

            enhanceAllTables();

        }


    }

);





/*
=====================================================
 Utility Functions
=====================================================
*/


function isNumeric(value){


    if(!value)
        return false;


    value = value
        .replace(/[$€£¥,%\s]/g,"")
        .trim();


    return value !== "" && !isNaN(value);


}




function createBadge(text,type){


    const span = document.createElement("span");


    span.className =
        `${CONFIG.badgeClass} ${type}`;


    span.textContent = text;


    return span;

}




function detectStatus(td){


    const value =
        td.textContent
        .trim()
        .toLowerCase();



    const statusMap = {


        success:"success",
        completed:"success",
        complete:"success",
        approved:"success",
        active:"success",
        done:"success",


        pending:"warning",
        waiting:"warning",
        processing:"warning",


        failed:"danger",
        error:"danger",
        rejected:"danger",
        inactive:"danger"

    };



    if(statusMap[value]){


        td.textContent="";


        td.appendChild(

            createBadge(
                value,
                statusMap[value]
            )

        );


    }


}





function analyzeCells(table){


    table
    .querySelectorAll("tbody td")
    .forEach(td=>{


        const text =
            td.textContent.trim();



        if(isNumeric(text)){


            td.classList.add(
                CONFIG.numberClass
            );


        }



        detectStatus(td);



    });



}





/*
=====================================================
 Wrap Tables
=====================================================
*/


function wrapTable(table){


    if(
        table.parentElement &&
        table.parentElement.classList.contains(
            CONFIG.wrapperClass
        )
    ){

        return;

    }



    const wrapper =
        document.createElement("div");



    wrapper.className =
        CONFIG.wrapperClass;



    table.parentNode.insertBefore(
        wrapper,
        table
    );



    wrapper.appendChild(table);



}





/*
=====================================================
 Sticky Header
=====================================================
*/


function prepareHeader(table){


    const headers =
        table.querySelectorAll(
            "thead th",
        );



    headers.forEach(th=>{


        th.style.position="sticky";

        th.style.top="0";

        th.style.zIndex="20";


    });


}





/*
=====================================================
 Add Table Features
=====================================================
*/


function enhanceTable(table){


    if(table.dataset[CONFIG.processed])

        return;



    table.dataset[CONFIG.processed]=true;



    table.classList.add(
        CONFIG.tableClass
    );



    wrapTable(table);



    prepareHeader(table);



    analyzeCells(table);



}





/*
=====================================================
 Scan Page Tables
=====================================================
*/


function enhanceAllTables(){


    if(!extensionEnabled)

        return;



    document
    .querySelectorAll("table")
    .forEach(table=>{


        enhanceTable(table);


    });


}





/*
=====================================================
 Observe Dynamic Websites
=====================================================
*/


const observer =
new MutationObserver(()=>{


    if(extensionEnabled){

        enhanceAllTables();

    }


});



observer.observe(
    document.documentElement,
    {

        childList:true,

        subtree:true

    }

);





/*
=====================================================
 Popup Communication
=====================================================
*/


chrome.runtime.onMessage.addListener(
(message)=>{


    if(
        message.action ===
        "toggleEnhancer"
    ){



        extensionEnabled =
            message.enabled;



        if(extensionEnabled){


            enhanceAllTables();


        }
        else {



            document
            .querySelectorAll(
                "."+
                CONFIG.tableClass
            )
            .forEach(table=>{


                table.classList.remove(
                    CONFIG.tableClass
                );


                delete table.dataset[
                    CONFIG.processed
                ];


            });



        }



    }


});





/*
=====================================================
 Keyboard Shortcut Support
=====================================================
*/


document.addEventListener(
"keydown",
(event)=>{


    if(
        event.ctrlKey &&
        event.shiftKey &&
        event.key==="T"
    ){


        extensionEnabled =
            !extensionEnabled;


        if(extensionEnabled){

            enhanceAllTables();

        }



    }


});



})();