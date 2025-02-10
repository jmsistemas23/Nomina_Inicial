using System;
using System.Collections;



    [Serializable]
    public class Lista_cat_puesto_equivalencia 
    {

     
        protected IList List;
        public Puesto_Equivalencia this[int index]
        {
            get { return ((Puesto_Equivalencia)(List[index])); }
            set { List[index] = value; }
        }

        public int Add(Puesto_Equivalencia entityBase)
        {
            return List.Add(entityBase);
        }
    }

    [Serializable]
    public class Puesto_Equivalencia 
    {
        public int cvepuesto_equivalencia { get; set; }
        public int cveNivel_educativo{ get; set; }
        public string cvepue{ get; set; }

        public string despue{ get; set; }
        public string horjorpu{ get; set; }
        public string hrsequ{ get; set; }



        public Puesto_Equivalencia()
        {
            cvepuesto_equivalencia = 0;
        }


    }


