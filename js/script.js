const image_input = document.querySelector('#file');
const get_file = document.querySelector('#get_file');
const percentage = document.querySelector('#percentage');
const slider = document.querySelector('.slider');
const resize_slider = document.querySelector('.resize_slider')
const image_id  = document.querySelector('#image_id');
const save_button = document.querySelector('#save');
const input_id  = document.querySelector('#input');
const rotate_buttons = document.querySelectorAll('#rotate_section button');
const height_slider = document.querySelector('#height');
const height_value = document.querySelector('#height_value')
const width_slider = document.querySelector('#width');
const width_value = document.querySelector('#width_value');
const filter = document.querySelectorAll('.button');


let uploaded_image;
let brightness = 100;
let contrast = 100;
let blurs = 0;
let grayscale = 0;
let saturate = 100;
let opacity = 100;
let hue_rotate = 0;
let invert = 0;
let sepia = 0;
let rotate = 0;
let vertical = 1;
let horizontal = 1;
let height = 275;
let width = 275;

get_file.addEventListener('click', function(){
    image_input.click();
})

image_input.addEventListener('change', function(){
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        uploaded_image = reader.result;
        image_id.src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
})



filter.forEach(function(option){
    option.addEventListener('click', function(){
        document.querySelector('.filters .active').classList.remove('active');
        option.classList.add('active');
        input_id.innerText = option.value;
        slider.max = 200;
        if(option.id === 'brightness'){
            slider.value = option.value;
        }else if(option.id === 'contrast'){
            slider.value = contrast;
        }else if(option.id === 'blurs'){
            slider.value = blurs;
        }else if(option.id === 'grayscale'){
            slider.value = grayscale;
        }else if(option.id === 'saturate'){
            slider.value = saturate;
        }else if(option.id === 'hue_rotate'){
            slider.value = hue_rotate;
        }else if(option.id === 'invert'){
            slider.value = invert;
        }else if(option.id === 'sepia'){
            slider.value = sepia;
        }
    
    });
});

slider.addEventListener('input', function(){
    percentage.innerText = slider.value;
    let option = document.querySelector('.filters .active')
    if(option.id == 'brightness'){
        brightness = slider.value;
        slider.max = 200;
    }else if(option.id == 'contrast'){
        contrast = slider.value;
        slider.max = 200;
    }else if(option.id == 'blur'){
        slider.max = 10;
        blurs = slider.value;
    }else if(option.id == 'grayscale'){
        slider.max = 100;
        grayscale = slider.value;
    }else if(option.id == 'saturate'){
        slider.max = 100;
        saturate = slider.value;
    }else if(option.id == 'hue_rotate'){
        slider.max = 360;
        hue_rotate = slider.value;
    }else if(option.id == 'invert'){
        slider.max = 100;
        invert = slider.value;
    }else if(option.id == 'sepia'){
        slider.max = 100;
        sepia = slider.value;
    }
    add_filter();
})

rotate_buttons.forEach(function(option){
    option.addEventListener('click', function(){
        if(option.id == 'vertical'){
            rotate -= 90;
        }
        if(option.id == 'horizontal'){
            rotate += 90;
        }
        add_filter()
})})


height_slider.addEventListener('input', function(){
            height = height_slider.value;
            height_value.innerHTML = height_slider.value
add_filter()
})


width_slider.addEventListener('input', function(){
            width = width_slider.value;
            width_value.innerHTML = width_slider.value
add_filter()
})

function add_filter(){
    image_id.style.filter = `brightness(${brightness}%) 
                            contrast(${contrast}%) 
                            blur(${blurs}px) 
                            grayscale(${grayscale}%) 
                            saturate(${saturate}%) 
                            hue-rotate(${hue_rotate}deg)
                            invert(${invert}%) 
                            sepia(${sepia}%)`
    image_id.style.transform =  `rotate(${rotate}deg)`;
    image_id.style.height = `${height}px`;
    image_id.style.width = `${width}px`;
};



save_button.addEventListener('click', () =>{
    const board = document.createElement('canvas');
    const contxt = board.getContext('2d');
    board.width = image_id.width;
    board.height = image_id.height;
    contxt.filter = `brightness(${brightness}%) 
                    contrast(${contrast}%) 
                    blur(${blurs}px) 
                    grayscale(${grayscale}%) 
                    saturate(${saturate}%) 
                    hue-rotate(${hue_rotate}deg)
                    invert(${invert}%) 
                    sepia(${sepia}%)`;
    contxt.rotate = `rotate(${rotate}deg)`;
    contxt.drawImage(image_id, -board.width / 50, -board.height / 50, board.width, board.height);
    const URI = board.toDataURL('image/png');
    board.src = URI;
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(board.msToBlob(), 'edited_img.png');
    }else{
        const a = document.createElement('a');
        document.body.appendChild(a);
        a. href = board.toDataURL();
            a.download = 'edited_image.png';
            a.click();
        document.body.removeChild(a);
}});


