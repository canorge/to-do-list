const textBox=document.getElementById('textInput');
const buton=document.getElementById('addBtn');
const list=document.getElementById('List');



const addToDo = (text, isChecked = false) => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `${text} <i class="fa-solid fa-xmark"></i>`;

    // Silme butonuna tıklayınca öğeyi kaldırma
    li.querySelector('i').addEventListener('click', () => {
        li.remove();
        saveToLocal();
    });

    // Check/uncheck işlemi
    li.addEventListener('click', () => {
        if (li.classList.contains('checked')) {
            li.classList.remove('checked');
        } else {
            li.classList.add('checked');
        }
        saveToLocal();
    });

    // Eğer öğe checked olarak gelmişse, checked sınıfı eklenir
    if (isChecked) {
        li.classList.add('checked');
    }

    // Listeye ekle
    list.appendChild(li);

    // LocalStorage'a kaydet
    saveToLocal();
};


buton.addEventListener('click',()=>{
    if(textBox.value==''){
        alert('You must write something!');
    }
    else
    {
        addToDo(textBox.value);
        textBox.value=textBox.ariaPlaceholder;
    }
});



const saveToLocal = () => {
    const items = [];
    document.querySelectorAll('li.list-item').forEach(li => {
        items.push({
            text: li.childNodes[0].textContent.trim(),
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('data', JSON.stringify(items));
};

// LocalStorage'dan verileri gösterme fonksiyonu
const showFromLocal = () => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.forEach(item => {
        addToDo(item.text,item.checked);
        if (item.checked) {
            list.lastChild.classList.add('checked'); 
        }
    });
};
showFromLocal();