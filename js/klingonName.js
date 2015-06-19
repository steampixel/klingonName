/*
    Klingon name generator
*/
var klingonName = function (config) {
  
    /*
        Default configuration
    */
    if(typeof config.translate == 'undefined'){config.translate = false;}
    if(typeof config.min_syllables == 'undefined'){config.min_syllables = 2;}
    if(typeof config.max_syllables == 'undefined'){config.max_syllables = 3;}
    if(typeof config.phoneme_weights == 'undefined'){config.phoneme_weights = [];}
    if(typeof config.seed == 'undefined'){config.seed = 666;}//initiate the evil
    if(typeof config.phonemes == 'undefined'){config.phonemes = [
		{	letter:'b',		ipa:'b',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English ban'},
		{	letter:'ch',	ipa:'ʧ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English church'},
		{	letter:'D',		ipa:'ɖ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as with the English d; but place the tip of your tongue behind the hard part of the roof of your mouth instead of behind your teeth.'},
		{	letter:'gh',	ipa:'ɣ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English g and h at the same time; speak with the tongue pulled back.'},
		{	letter:'H',		ipa:'X',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as Scots loch or the musical composer Bach. Lift the back of your tongue and then force a puff of air out of your throat.'},
		{	letter:'j',		ipa:'ʤ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English judge'},
		{	letter:'l',		ipa:'l',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English lung, never velarized as English gull'},
		{	letter:'m',		ipa:'m',	weights:{consonant:1,vowel:0,male:1,female:5},	description:'as English man'},
		{	letter:'n',		ipa:'n',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English nan'},
		{	letter:'ng',	ipa:'ŋ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English ring; never as in angle'},
		{	letter:'p',		ipa:'pʰ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English pan, but accompanied by a puff of air not only in word initial positions, but in all positions (aspirated)'},
		{	letter:'q',		ipa:'qʰ',	weights:{consonant:1,vowel:0,male:5,female:1},	description:'as Arabic Qur\'an, but aspirated - like the English k, but with the tongue further back, and accompanied by a puff of air'},
		{	letter:'Q',		ipa:'q͡χ',	weights:{consonant:1,vowel:0,male:5,female:1},	description:'occurs in Nez Percé, Wolof and Kabardian - similar to the above q, but harder and louder. To produce this, place the back of your tongue far back into your mouth; then force the air out harshly.'},
		{	letter:'r',		ipa:'r',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'trilled as in Spanish rojo'},
		{	letter:'S',		ipa:'ʂ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'somewhere between the English s and sh. Produce an English sh sound, but with the tongue in the position used for the Klingon D /?/ sound.'},
		{	letter:'t',		ipa:'tʰ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English tan, but accompanied by puff of air not only in word initial positions, but in all positions (aspirated)'},
		{	letter:'tlh',	ipa:'t͡ɬ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as Nahuatl Nahuatl - similar to the English pronunciation of tl, but accompanied by an exhalation. Say an English t while exhaling an l.'},
		{	letter:'v',		ipa:'v',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English van'},
		{	letter:'w',		ipa:'w',	weights:{consonant:1,vowel:0,male:5,female:1},	description:'as English wash'},
		{	letter:'y',		ipa:'j',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'as English yes'},
		{	letter:'\'',	ipa:'ʔ',	weights:{consonant:1,vowel:0,male:1,female:1},	description:'glottal stop, as between the vowels of uh-oh'},
		{	letter:'a',		ipa:'ɑ',	weights:{consonant:0,vowel:1,male:1,female:5},	description:'Sounds like "ah" in English; ex: spa (never short like jab).'},
		{	letter:'e',		ipa:'ɛ',	weights:{consonant:0,vowel:1,male:1,female:1},	description:'Sounds like "eh" in English; ex: egg.'},
		{	letter:'I',		ipa:'ɪ',	weights:{consonant:0,vowel:1,male:1,female:5},	description:'Sounds like a short "i" in English; ex: in. Occasionally takes the "ee" sound, but when this happens and why is unknown.'},
		{	letter:'o',		ipa:'o',	weights:{consonant:0,vowel:1,male:5,female:1},	description:'as in mow, or know.'},
		{	letter:'u',		ipa:'u',	weights:{consonant:0,vowel:1,male:5,female:1},	description:'Like a long u in English; ex: prune (never short like butt)'}
	];}
    if(typeof config.syllables == 'undefined'){config.syllables = [
		{
            composition:[
                {type:'consonant'},//First create random consonant
                {type:'vowel'},//Then create random vowel
                {type:'consonant',except:['w','\'']},//Last create random consonant excepting w and '. A klingon syllable never ends with "ow", "uw", "ow'" or "uw'"
            ],
			description: 'CVC',//This is only for internal debugging
			weights:{start:3,middle:3,end:3}
		},
		{
            composition:[
                {type:'consonant'},//First create random consonant
                {type:'vowel'},//Then create random vowel
            ],
			description: 'CV',//This is only for internal debugging
			weights:{start:2,middle:2,end:0},
			max_occurrence:1
		},
		{
            composition:[
                {type:'consonant'},//First create random consonant
                {type:'vowel'},//Then create random vowel
                {type:'phoneme',letter:'r'},//Then create r
                {type:'phoneme',letter:'gh'},//Then create gh
            ],
			description: 'CVrgh',//This is only for internal debugging
			weights:{start:1,middle:1,end:1},
			max_occurrence:1
		},
		{
            composition:[
                {type:'consonant'},//First create random consonant
                {type:'vowel'},//Then create random vowel
                {type:'phoneme',letter:'y'},//Then create y
                {type:'phoneme',letter:'\''},//Then create '
            ],
			description: 'CVy\'',//This is only for internal debugging
			weights:{start:1,middle:1,end:1},
			max_occurrence:1
		},
		{
            composition:[
                {type:'consonant'},//First create random consonant
                {type:'vowel',except:['o','u']},//Then create random vowel excepting o and u. A klingon syllable never ends with "ow", "uw", "ow'" or "uw'"
                {type:'phoneme',letter:'w'},//Then create w
                {type:'phoneme',letter:'\''},//Then create '
            ],
			description: 'CVw\'',//This is only for internal debugging
			weights:{start:1,middle:1,end:1},
			max_occurrence:1
		}
	];}
    
    /*
        Private Variables
    */
    var generated_syllables = [];
    
    /*
        Private Functions
    */
    
    var integerHash = function(str){

        str = str.toLowerCase();

        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        if(hash<0){
            hash = hash * -1;
        }
        
        return hash;
    }
    
    var getSeededRandomNumber = function(min,max){
		
		if(typeof min =='undefined'){min = 0;}
		if(typeof max =='undefined'){max = 1;}
	 
		config.seed = (config.seed * 9301 + 49297) % 233280;
		
		var rnd = config.seed / 233280;
	 
		return Math.round(min + rnd * (max - min));
		
	}
    
    var getPhonemeByLetter = function(letter){
        
        for(var i = 0;i<config.phonemes.length;i++){
			
			if(config.phonemes[i].letter==letter){
                //console.log('Selecting phoneme by letter: '+config.phonemes[i].letter);
				return config.phonemes[i];
			}
            
		}
		
		return false;
        
    }
    
    var getRandomPhoneme = function(weights,except){
        
        if(typeof weights =='undefined'){weights = new Array();}
        if(typeof except =='undefined'){except = new Array();}
        
        //console.log(typeof except);
        
        //Phonem Gewichtungen aus der Konfiguration hinzufügen
        //So ist es zum Beispiel möglich die Gewichtung 'male' oder 'female' an die Klasse zu übergeben
        //So kann ein Wort erzeugt werden, dass eher weiblich oder eher männlich klingt
        weights = weights.concat(config.phoneme_weights);

		//Gewichtungen initialisieren
		for(var i = 0;i<config.phonemes.length;i++){
            
            //Wenn das Phonem nicht gezogen werden darf wird die Gewichtung mit 0 initialisiert
            if(except.indexOf(config.phonemes[i].letter)!=-1){//Wenn das Phonem auf der except liste steht...
               config.phonemes[i].weights.added_weight = 0;
               //console.log('except: '+config.phonemes[i].letter);
            }else{
               config.phonemes[i].weights.added_weight = 1;
            }
			
		}
		
		//Relevante Gewichtungen der Items jeweils miteinander multiplizieren
		if(typeof weights != 'undefined'){
			for(var a = 0;a<weights.length;a++){	
				//Summierte Gewichtung berechnen
				for(var i = 0;i<config.phonemes.length;i++){
					if(typeof config.phonemes[i].weights[weights[a]] != 'undefined'){//Wenn es diese Gewichtung überhaupt gibt...
						config.phonemes[i].weights.added_weight = config.phonemes[i].weights.added_weight * config.phonemes[i].weights[weights[a]];
					}
				}
			}
		}
		
		//Gewichtungen nacheinander addieren
        //So entstehen unterschiedlich groß gewichtete Abstände zwischen den einzelnen Items
		for(var i = 0;i<config.phonemes.length;i++){
			if(i>0){//Nicht für das erste Element
				config.phonemes[i].weights.added_weight = config.phonemes[i].weights.added_weight + config.phonemes[i-1].weights.added_weight;//Gewichtung des Vorgängers draufrechnen
			}
		}
        
        //Zufällige Zahl ziehen, die zwischen 1 und der Gewichtung des letzten Items liegt
		var random = getSeededRandomNumber(1,config.phonemes[config.phonemes.length-1].weights.added_weight);//Die Addierte Gewichtung des letzten Elements ist der Maximum von random()
        
        //Das gezogene Item anhand der Gewichtung finden
		for(var i = 0;i<config.phonemes.length;i++){
			if(random<=config.phonemes[i].weights.added_weight){
                
                //console.log('Selecting random phonemes: '+config.phonemes[i].letter);
                
				return config.phonemes[i];
                
			}
		}
        
        return false;
        
    }
    
    //Zieht eine zufällige Silbe auf Basis von angegebenen Gewichtungen, die berücksichtigt werden sollen
    //Wird der Paramerter nicht angegeben werden die Gewichtungen ignoriert
    var getRandomSyllable = function(weights){

        //Gewichtung der Silben initialisieren
		for(var i = 0;i<config.syllables.length;i++){//Für jede Silbenkonfiguration...
			
			config.syllables[i].weights.added_weight = 1;//Gewichtung mit 1 initialisieren
			
            //Eine Variable initialisieren in der gespeichert wird wie oft die Silbe in diesem Wort bereits gezogen wurde
			if(typeof config.syllables[i].occurrence == 'undefined'){config.syllables[i].occurrence = 0;}//Auftreten initialisieren
			
			if(typeof config.syllables[i].max_occurrence != 'undefined'){//Wenn die maximale Häufigkeit definiert ist...

				if(config.syllables[i].occurrence>=config.syllables[i].max_occurrence){//Wenn keine Vorkommen mehr erlaubt sind...
					config.syllables[i].weights.added_weight = 0;//Gewichtung einfach auf 0 setzen, da dieses Element nicht mehr gezogen werden darf
				}
				
			}

		}
        
        //Gewünschte Gewichtungen der Silben zunächst miteinander multiplizieren
		//Dabei werden Gewichtungen ignoriert, die mit 0 initialisiert wurden, da das Ergebnis 0 bleibt
		if(typeof weights != 'undefined'){
			for(var a = 0;a<weights.length;a++){//Für jede Gewichtung, die berücksichtigt werden soll...
				for(var i = 0;i<config.syllables.length;i++){//Suche die gewünschte Gewichtung in den Silbendefinitionen
					if(typeof config.syllables[i].weights[weights[a]] != 'undefined'){//Wenn es diese Gewichtung überhaupt gibt...
						config.syllables[i].weights.added_weight = config.syllables[i].weights.added_weight * config.syllables[i].weights[weights[a]];
					}
				}
			}
		}
        
        //Gewichtungen aller Silbenkonfigurationen dann nacheinander addieren
        //So errechnet sich für jede Silbe eine individuelle Wahrscheinlichkeit mit der sie gezogen werden kann
		for(var i = 0;i<config.syllables.length;i++){
			if(i>0){//Nicht für das erste Element
				config.syllables[i].weights.added_weight = config.syllables[i].weights.added_weight + config.syllables[i-1].weights.added_weight;//Gewichtung des Vorgängers draufrechnen
			}
		}
        
        var random = getSeededRandomNumber(1,config.syllables[config.syllables.length-1].weights.added_weight);//Die Addierte Gewichtung des letzten Elements ist der Maximum von random()

        //Als nächstes werden nacheinander alle Silbenkonfigurationen durchlaufen
		for(var i = 0;i<config.syllables.length;i++){
			if(random<=config.syllables[i].weights.added_weight){//Wenn der gezogene random-Wert größer ist als die addierte Gewichtung der Silbe wird diese ausgewählt
				config.syllables[i].occurrence++;//Merken, dass die Silbe bereits gezogen wurde
				
                //console.log('Selecting random syllable: '+config.syllables[i].description);
                
                //Phoneme Ziehen
                var generated_phonemes = [];
                for(var p = 0;p<config.syllables[i].composition.length;p++){//Für jede Phonembeschreibung innerhalb der Komposition
                    
                    //select a single phoneme
                    if(config.syllables[i].composition[p].type=='phoneme'){
                        
                        generated_phonemes.push(getPhonemeByLetter(config.syllables[i].composition[p].letter));
                        
                    }
                    
                    //Select a random vowel or consonant
                    if(config.syllables[i].composition[p].type=='consonant'||config.syllables[i].composition[p].type=='vowel'){
                        
                        generated_phonemes.push(getRandomPhoneme([config.syllables[i].composition[p].type],config.syllables[i].composition[p].except));
                        
                    }

                }
                
                return  generated_phonemes;
                
			}
		}
        
    }
    
    var composeRandomName = function(){
        
        //console.log('composing random name');
        
        //How many syllables to create?
        var syllable_count = getSeededRandomNumber(config.min_syllables,config.max_syllables);
        
        //Für jede Silbe, die dem Namen hinzugefügt werden soll...
        for(var s=0;s<syllable_count;s++){
            
            var syllable;
            
            //Feststellen, ob es eine Start-, Mittel- oder Endsilbe wird
            if(s==0){//Startsilbe
                var weight = 'start';
            }else if(s==syllable_count-1){//Endsilbe
                var weight = 'end';
            } else{//Alles dazwischen
                var weight = 'middle';
            }
            
            //Eine Silbe mit der betreffenden Gewichtung ziehen
            generated_syllable = getRandomSyllable([weight]);
            
            generated_syllables.push(generated_syllable);
            
        }

    }
    
    /*
        Initiate
    */
    
    if(typeof(config.translate)=='string'){
        
        //console.log('translation mode');
        //console.log('translating '+config.translate);
        config.seed = config.seed + integerHash(config.translate);

    }else{
        
        //create random name
        //console.log('random mode');
        config.seed = Math.random();//set random seed
        
    }
    
    //compose the name
    composeRandomName();

    /*
        Public part
    */
 
  return {
        
        getDescriptions : function(){

            var return_descriptions = new Array();
            
            var letter_unique_list = new Array();
            
            //für jede Silbe
            for(var i=0;i<generated_syllables.length;i++){
                
                //Für jedes Phonem der Silbe
                for(var p=0;p<generated_syllables[i].length;p++){
                    
                    var return_object = {'letter':generated_syllables[i][p].letter,'description':generated_syllables[i][p].description};
                    
                    if(letter_unique_list.indexOf(generated_syllables[i][p].letter)==-1){
                        
                        letter_unique_list.push(generated_syllables[i][p].letter);
                        return_descriptions.push(return_object);
                        
                    }
                    
                       

                }
                
            }

            return return_descriptions;
            
        },
        
        getString : function(hyphenation,split){
            
            if(typeof hyphenation == 'undefined'){hyphenation = false;}
            if(typeof split == 'undefined'){split = false;}
            
            var str = '';
            
            //für jede Silbe
            for(var i=0;i<generated_syllables.length;i++){
                
                //Für jedes Phonem der Silbe
                for(var p=0;p<generated_syllables[i].length;p++){

                    str = str + generated_syllables[i][p].letter;
                    
                    if(split){
                        str = str + '&nbsp';
                    }
                    
                }

                if(hyphenation){
                    if(i<generated_syllables.length-1){
                        str = str + '-';
                        
                        if(split){
                           str = str + '&nbsp';
                        }
                        
                    }
                }
                
            }
            
            return str;
            
        },
        
        getIpaString : function(hyphenation,split){
            
            if(typeof hyphenation == 'undefined'){hyphenation = false;}
            if(typeof split == 'undefined'){split = false;}
            
            var str = '';
            
            for(var i=0;i<generated_syllables.length;i++){
                
                //Für jedes Phonem der Silbe
                for(var p=0;p<generated_syllables[i].length;p++){
                    
                    str = str + generated_syllables[i][p].ipa;
                    
                    if(split){
                       str = str + '&nbsp';
                    }
                    
                }
                
                if(hyphenation){
                    if(i<generated_syllables.length-1){
                        str = str + '-';
                        
                        if(split){
                            str = str + '&nbsp';
                        }
                        
                    }
                }
                
            }
            
            return str;
            
        }
        
    }

 
};