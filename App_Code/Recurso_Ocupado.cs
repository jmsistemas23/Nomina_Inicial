using System;
using System.Collections;



    [Serializable]
    public class Lista_Recurso_Ocupado 
    {
        protected IList List;
        public Recurso_Ocupado this[int index]
        {
            get { return ((Recurso_Ocupado)(List[index])); }
            set { List[index] = value; }
        }
    }

    [Serializable]
    public class Recurso_Ocupado 
    {
        public string cveRecurso_Ocupado { get; set; }
        public string cveRecurso_Vacante { get; set; }
        public string cveNivel_Educativo { get; set; }
        public string Nombre { get; set; }
        public string cvepuesto_equivalencia_detalle { get; set; }

        public string FECHA_DESDE { get; set; }
        public string FECHA_HASTA { get; set; }
        public string OBSERVACIONES { get; set; }
        public string cveMunicipio { get; set; }
        public string cveRecurso_Movimiento { get; set; }
        
        public string cvezon { get; set; }         
        public string codniv { get; set; }
        public string cvenisni_vacante { get; set; }
        public string cvenisni_ocupado { get; set; }

        public string hora_vacante { get; set; }
        public string hora_ocupado { get; set; } 
        public string importe_vacante { get; set; }
        public string importe_ocupado { get; set; }

        public string puesto_ocupado { get; set; }
        public string FolioDocumentoCIT { get; set; }
        public string Plaza_Movimiento{ get; set; }
        public string cveRecurso_Movimiento_tipo { get; set; }

        
         
        

        public Recurso_Ocupado()
        {
            cveRecurso_Ocupado = "0";
        }


    }

