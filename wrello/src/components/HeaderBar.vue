<script setup>
</script>

<template>
    <section class="header_title">
        <div id="header_title_left">
            <button id="wrello" class="classic">Wrello</button>
            <button class="withbck"><img src="../../public/star.png" alt=""></button>
            <span class="board-header-btn-divider"></span>
            <button class="withbck"><img src="../../public/user.png" alt=""> Visible par l'espace de travail</button>
            <span class="board-header-btn-divider"></span>
            <button class="white_btn"><img src="../../public/tabsB.png" alt=""> Tableau</button>
            <button class="withbck"><img src="../../public/chevron_W.png" alt=""></button>
        </div>
        <div id="header_title_right">
            <button class="withbck"><img src="../../public/ship.png" alt=""> Power-ups</button>
            <button class="withbck"><img src="../../public/flash.png" alt=""> Automatisation</button>
            <span class="board-header-btn-divider"></span>
            <button class="withbck"><img src="../../public/sort.png" alt=""> Filtre</button>
            <span class="board-header-btn-divider"></span>
            <button id="profile"><img style="height:24px; width:24px;" src="../../public/w.png" alt=""></button>
            <button class="white_btn"><img src="../../public/adduserB.png" alt=""> Partager</button>
            <span class="board-header-btn-divider"></span>
            <button class="withbck"><img src="../../public/option.png" alt=""></button>
        </div>
    </section>
</template>


<style scoped>
.header_title {
    top: 50px;
    display: flex;
    left: 270px;
    position: fixed;
    justify-content: space-between;
    width: -webkit-fill-available;
    align-items: center;
    justify-content: space-between;
}
.board-header-btn-divider {
    border-left: 1.3px solid #ffffff52;
    border-radius: 50px;
    height: 23px;
    margin: 8px 5px 12px 5px;
}
.classic {
    background-color: unset;
    font-weight: bold;
    color: white;
    transition: 0.3s;
}
.withbck {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
    color: white;
    transition: 0.3s;
}
.white_btn {
    background-color: #ffffffc9;
    color: #172B4D;
    transition: 0.3s;
}
.white_btn:hover {
    background-color: #ffffffe3!important;
    transition: 0.3s;
}
.classic:hover {
    transition: 0.3s;
}
.header_title button {
    font-size: 14px;
    width: auto;
    border: none;
    height: 41px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0px 16px;
    letter-spacing: -0.3px;
    margin: 3px;
    transition: 0.3s;
}
#wrello:hover {
    background-color: #dfe1e66f;
}
.header_title button:hover {
    background-color: #dfe1e66f;
    transition: 0.3s;
}
#profile {
    vertical-align: bottom;
    background-color: unset;
}
button img {
    height: 15px;
    width: 15px;
}
.header_title_left {
    display: flex;
}
.header_title_right {
    display: flex;
}
</style>
