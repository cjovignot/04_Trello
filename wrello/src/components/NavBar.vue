<script setup>
</script>

<template >
    <nav>
        <a id="menu" href="/"></a>
        <a id="logo" href="/"></a>
        <div id="nav_left">
            <button class="menus">Espaces de travail<img src="../../public/chevron_W.png" alt=""></button>
            <button class="menus">Récent<img src="../../public/chevron_W.png" alt=""></button>
            <button class="menus">Favoris<img src="../../public/chevron_W.png" alt=""></button>
            <button class="menus">Modèles<img src="../../public/chevron_W.png" alt=""></button>
            <button class="menus">Créer</button>
        </div>
        <div id="nav_right">
            <input placeholder="Recherche..." type="text">
            <button><img src="../../public/notification.png" alt=""></button>
            <button><img style="height:20px; width:20px;" src="../../public/question.png" alt=""></button>
            <button><img style="height:24px; width:24px;" src="../../public/w.png" alt=""></button>
        </div>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee&display=swap');
nav {
    display: flex;
    z-index: 999;
    position: fixed;
    top: 0;
    background-color: hsl(202,10%,10.7%);
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 6px 4px;
    max-height: 44px;
    width: 100%;
    border-bottom: 1px rgba(128, 128, 128, 0.392) solid;
}

#nav_left {
    display: flex;
    width: 100%;
    justify-content: flex-start;
}
#menu {
    background-image: url(../public/menu.png);
    background-repeat: no-repeat;
    background-position: center;
    margin: 2px 0;
    background-size: 48%;
    height: 32px;
    width: 47px;
    border-radius: 4px;
}
#menu:hover {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
}
#logo {
    background-image: url(../public/logo.gif);
    background-repeat: no-repeat;
    background-position: center;
    background-position-y: 9px;
    background-position-x: 3px;
    background-size: 87%;
    border-radius: 4px;
    width: 118px;
    margin-left: 4px;
    height: 32px;
    padding: 6px 10px;
    opacity: 1;
}
#logo:hover {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
}
.menus {
    font-size: 14px;
    width: auto;
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
    margin-left: 8px;
    margin-bottom: 2px;
}
#nav_right {
    display: flex;
}
#nav_right button {
    height: 32px;
    width: 32px;
    background-color: unset;
    margin: 3px;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
}
#nav_right button:hover {
    background-color: var(--dynamic-button-hovered, rgba(255, 255, 255, 0.3));
}
button img {
    height: 32px;
    width: 32px;
    vertical-align: middle;
}
nav input {
    height: 30px;
    align-self: center;
    margin-right: 10px;
    border-color: #ffffff29;
    outline: none;
    border: none;
    color: white;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.2);
}
nav input::placeholder {
    color: white;
    padding: 2px;
}
</style>