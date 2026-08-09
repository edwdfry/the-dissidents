/*
============================================================

Animation Hero

Cette version est volontairement légère.

Les animations GSAP seront ajoutées
dans le prochain livrable.

============================================================
*/

const hero=document.querySelector(".hero-content");

hero.animate(

[
{opacity:0,transform:"translateY(40px)"},
{opacity:1,transform:"translateY(0)"}

],

{
duration:1200,
fill:"forwards",
easing:"ease-out"
}

);