
//define some vars
var first_name, father_name, house_name;
var current_mode = 'random';

//This function renders the "Your name is..." sentence
function render(){
    
    var enable_hyphenation = $('#enable_hyphenation').is(":checked");
    var enable_ipa = $('#enable_ipa').is(":checked");
    var enable_split = $('#enable_split').is(":checked");
    var selected_gender = $( "#select_gender option:selected" ).attr('value');
    var enable_description = $('#enable_description').is(":checked");
    
    var html = 'Your ';
    
    if(current_mode=='random'){
        
        html = html + 'random';
        
    }else{
        
        html = html + 'translated';
        
    }
    
    html = html + ' name is ';
    
    html = html + '<b>'+first_name.getString(enable_hyphenation,enable_split) + '</b> ';
    
    if(enable_ipa){
        
        html = html + '['+first_name.getIpaString(enable_hyphenation,enable_split) + '] ';
        
    }
    
    if(selected_gender=='male'){
        html = html + 'son of ';
    }else{
        html = html + 'daughter of ';
    }
    
    html = html + '<b>'+father_name.getString(enable_hyphenation,enable_split) + '</b> '; 
    
    if(enable_ipa){
        
        html = html + '['+father_name.getIpaString(enable_hyphenation,enable_split) + '] ';
        
    }
    
    html = html + 'of house ';
    
    html = html + '<b>'+house_name.getString(enable_hyphenation,enable_split)+'</b>'; 
    
    if(enable_ipa){
        
        html = html + '['+house_name.getIpaString(enable_hyphenation,enable_split) + '] ';
        
    }
    
    $('#name_display').html(html);
    
    if(enable_description){
        
        var all_descriptions = new Array();
        
        all_descriptions = all_descriptions.concat(first_name.getDescriptions());
        all_descriptions = all_descriptions.concat(father_name.getDescriptions());
        all_descriptions = all_descriptions.concat(house_name.getDescriptions());
        
        var letter_unique_list = new Array();

        var html = '<b>Detail description:</b><ul>';

        //Für jede Silbe
        for(var i=0;i<all_descriptions.length;i++){
            
            if(letter_unique_list.indexOf(all_descriptions[i].letter)==-1){//If the phoneme is not already described
                        
                letter_unique_list.push(all_descriptions[i].letter);
                
                html = html + '<li><b>'+ all_descriptions[i].letter + '</b>: ' + all_descriptions[i].description +'</li>';
                        
            }

        }
        
        html = html + '</ul>';
        
       $('#description_display').html(html);
        
   }else{
        
       $('#description_display').html('');
        
   }
    
}

//This function regenerates the names
function generateNameString(){
    
    //Get selected gender
    var selected_gender = $( "#select_gender option:selected" ).attr('value');
    
    console.log(selected_gender);
    
    if(current_mode=='random'){

        first_name = new klingonName({
            min_syllables:2,
            max_syllables:3,
            phoneme_weights:[selected_gender]
        });

        father_name = new klingonName({
            min_syllables:2,
            max_syllables:3,
            phoneme_weights:['male']//Vater ist immer männlich
        });
        
        house_name = new klingonName({
            min_syllables:2,
            max_syllables:3
        });
        
    }else{
        
        first_name = new klingonName({
            min_syllables:2,
            max_syllables:3,
            phoneme_weights:[selected_gender],
            translate:$('#first_name').val()
        });

        father_name = new klingonName({
            min_syllables:2,
            max_syllables:3,
            phoneme_weights:['male'],//Der Vater ist immer männlich,
            translate:$('#last_name').val().concat('father')//Der Name des Vaters basiert auch auf dem Nachnamen. Damit er anders ist als der Hausname wird noch ein 'father' angehangen.
        });

        house_name = new klingonName({
            min_syllables:2,
            max_syllables:3,
            translate:$('#last_name').val()
        });
        
    }
    
}

$(document).ready(function(){
    
    /*
        Enable IPA
    */
    $('#enable_ipa').click(function(){
        
        render();
        
    });
    
    /*
        Enable Hyphenation
    */
    $('#enable_hyphenation').click(function(){
        
        render();
        
    });
    
    /*
        Enable Split
    */
    $('#enable_split').click(function(){
        
        render();
        
    });
    
    /*
        Enable Description
    */
    $('#enable_description').click(function(){
        
        render();

    });
    
    /*
        Switch gender
    */
    $('#select_gender').change(function(){
        
        var selected_gender = $( "#select_gender option:selected" ).val();
        
        generateNameString();
        
        render();
        
    });
    
    /*
        Generate Random Names
    */
    $( "#random_name_button" ).click(function() {
        
        current_mode = 'random';
        
        //console.log('random button');
        
        generateNameString();
        
        render();

    });
    
    /*
        Translate Names
    */
    $( "#translate_name_button" ).click(function() {
        
        current_mode = 'translate';
        
        if($('#first_name').val()!=''){
            
            generateNameString();
        
            render();
            
        }else{
            
            $('#name_display').html('Please fill out the first name field!');
            
        }
        
    });
    
    //init first random generation
    generateNameString();
    render();
    
    
});