








const drawPost = async function (catId) {
    let result = await getDocsByName('post');
    result = result.find((item) => item.cat_id === catId);
    document.querySelector('.main-content').innerHTML = result.content;
}



drawCategories().then(e => {
    const categories = document.querySelectorAll('.categories span');
    for (const item of categories) {
        item.addEventListener('click', (e) => {
            drawPost(e.target.dataset.id)
        });
    }
});