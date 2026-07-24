document.addEventListener("DOMContentLoaded", () => {


    const elements = {

        enabled: document.getElementById("enabled"),

        darkMode: document.getElementById("darkMode"),

        animations: document.getElementById("animations"),

        fontSize: document.getElementById("fontSize"),

        radius: document.getElementById("radius"),

        headerColor: document.getElementById("headerColor"),

        stickyHeader: document.getElementById("stickyHeader"),

        stickyColumn: document.getElementById("stickyColumn"),

        badges: document.getElementById("badges"),

        save: document.getElementById("save"),

        saved: document.getElementById("saved")

    };





    /*
    ==========================================
    Load saved settings
    ==========================================
    */


    chrome.storage.sync.get(

        {

            enabled:true,

            darkMode:false,

            animations:true,

            fontSize:"14",

            radius:"14",

            headerColor:"#0078d4",

            stickyHeader:true,

            stickyColumn:true,

            badges:true

        },


        (settings)=>{


            elements.enabled.checked =
                settings.enabled;


            elements.darkMode.checked =
                settings.darkMode;


            elements.animations.checked =
                settings.animations;


            elements.fontSize.value =
                settings.fontSize;


            elements.radius.value =
                settings.radius;


            elements.headerColor.value =
                settings.headerColor;


            elements.stickyHeader.checked =
                settings.stickyHeader;


            elements.stickyColumn.checked =
                settings.stickyColumn;


            elements.badges.checked =
                settings.badges;


        }

    );






    /*
    ==========================================
    Save settings
    ==========================================
    */


    elements.save.addEventListener(

        "click",

        ()=>{


            const settings = {


                enabled:
                    elements.enabled.checked,


                darkMode:
                    elements.darkMode.checked,


                animations:
                    elements.animations.checked,


                fontSize:
                    elements.fontSize.value,


                radius:
                    elements.radius.value,


                headerColor:
                    elements.headerColor.value,


                stickyHeader:
                    elements.stickyHeader.checked,


                stickyColumn:
                    elements.stickyColumn.checked,


                badges:
                    elements.badges.checked


            };





            chrome.storage.sync.set(

                settings,

                ()=>{


                    elements.saved.textContent =
                        "✓ Settings saved successfully";


                    setTimeout(()=>{


                        elements.saved.textContent="";


                    },2500);



                }

            );


        }

    );





});