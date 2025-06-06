function add_image(uri, caption){

    const images_el = document.getElementById("images");

    const img_el = document.createElement("img");
    img_el.setAttribute("src", uri);

    const caption_el = document.createElement("figcaption");
    caption_el.appendChild(document.createTextNode(caption));

    const fig_el = document.createElement("fig");
    fig_el.appendChild(img_el);
    fig_el.appendChild(caption_el);

    images_el.appendChild(fig_el);
}
