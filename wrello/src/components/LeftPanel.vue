<script setup>
</script>

<template >
    <section>
        <div id="panel_header_top">
            <img style="margin-right:5px;" src="../../public/logoW.png" alt="">
            <div style="display: flex; flex-direction: column;width: 100%;">
                <h5>Wankers by Epitech</h5>
                <p>Gratuit</p>
            </div>
            <button class="menus"><img src="../../public/chevron_WL.png" alt=""></button>
        </div>
        <div class="panel_body">
            <div class="panel_menu"><img src="../../public/trello.png" alt="">Tableaux</div>
            <div class="panel_menu"><img src="../../public/user.png" alt="">Membres</div>
            <div class="panel_menu"><img src="../../public/settings.png" alt="">Paramètres d'espace de travail</div>
        <p>Vues de l'espace de travail</p>
            <div class="panel_menu"><i><img src="../../public/tabs.png" alt="">Tableur</i></div>
            <div class="panel_menu"><i><img src="../../public/calendar.png" alt="">Calendrier</i></div>
        <p>Vos tableaux</p>
            <div class="panel_menu"><img src="../../public/wall.jpg" alt="">Wrello</div>
        </div>
        <div id="panel_header_bottom">
            <div id="offer" alt=""></div>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: hsl(202deg 10% 15.7%);
    color: white;
    position: fixed;
    width: 260px;
    height: 94vh;
    opacity: 96%;
    border-right: 1px rgba(128, 128, 128, 0.392) solid;
}
h5 {
    font-weight: bold;
}
h4 {
    font-weight: bold;
    padding: 8px;
}
section p {
    font-size: 12px;
}
#panel_header_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;
    padding: 10px;
    width: 100%;
    border-bottom: 1px rgba(128, 128, 128, 0.566) solid;
}
#panel_header_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 6px;
    border-top: 1px rgba(128, 128, 128, 0.566) solid;
}
#offer {
    width: 100%;
    background-size: 100%;
    height: 100%;
    background-image: url(../public/panelimg.png);
    background-position: center;
}
#offer:hover {
    cursor: pointer;
    background-image: url(../public/panelimghover.png);
}
.panel_body {
    padding: 16px 0;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
}
.panel_body img {
    height: 15px;
    width: 15px;
    margin-right: 10px;
}
.panel_body p {
    font-weight: 600;
    padding-left: 10px;
    font-size: 15px;
}
.panel_menu {
    padding: 10px 20px;
    font-size: 14px;
}
.panel_menu:hover {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
    cursor: pointer;
}
.menus {
    font-size: 14px;
    width: 20px;
    background-color: unset;
    border: none;
    color: white;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0px 16px;
    letter-spacing: -0.3px;
    margin: 3px;
}
.menus:hover {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
}
.menus img {
    height: 13px;
    width: 13px;
    vertical-align: middle;
    margin-left: -7px;
}
img {
    height: 45px;
    width: 45px;
}
</style>