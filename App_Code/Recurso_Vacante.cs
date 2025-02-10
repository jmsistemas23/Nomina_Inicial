using System;
using System.Collections;

    [Serializable]
    public class Lista_Recurso_Vacante
    {
        protected IList List;
        public Recurso_Vacante this[int index]
        {
            get { return ((Recurso_Vacante)(List[index])); }
            set { List[index] = value; }
        }
    }

    [Serializable]
    public class Recurso_Vacante 
    {
        

        public string cveRecurso_Vacante { get; set; }
        public string Numero_Plaza { get; set; }
        public string cveNivel_Educativo { get; set; }
        public string Nombre { get; set; }
        public string cvePuesto_Equivalencia { get; set; }
        public string hora_disponible { get; set; }
        public int cveMotivos_Baja { get; set; }
        public string cvezona { get; set; }
        public string Fecha_Baja { get; set; }
        public string fecha_baja_hasta { get; set; }
        public string OBSERVACIONES { get; set; }
        public string fecha_captura { get; set; }
        public string cveRecurso_Movimiento { get; set; }
        public string fecha_modificacion { get; set; }
        public int estatus { get; set; }
        public string numdocmp { get; set; }
        public string cvepagpl { get; set; }
        public int cveRecurso_vacante_tipo { get; set; }

        public string zona_economica { get; set; }
        public string FolioDocumentoCIT { get; set; }
        public int cveRecurso_Movimiento_tipo { get; set; }
        

   

        public Recurso_Vacante()
        {
            cveRecurso_Vacante = "0";
        }


    }

