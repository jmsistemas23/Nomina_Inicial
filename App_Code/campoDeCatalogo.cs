using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de campoDeCatalogo
/// </summary>
public class campoDeCatalogo
{
    public campoDeCatalogo(int parIde, string parTabla, string parNombre)
    {
        ide = parIde;
        nombre = parNombre;
        tabla = parTabla;
    }
    public campoDeCatalogo() { }

    private int ide;
    private string tabla;
    private string nombre;
    private string infoExtra;

    public void setIde(int i) { ide = i; }
    public void setNombre(string n) { nombre = n; }
    public void setTabla(string n) { tabla = n; }
    public void setInfoExtra(string n) { infoExtra = n; }
    public int getIde() { return ide; }
    public string getTabla() { return tabla; }
    public string getNombre() { return nombre; }
    public string getInfoExtra() { return infoExtra; }

    public override bool Equals(object obj)
    {
        if (obj is campoDeCatalogo)
        {
            campoDeCatalogo cc = (campoDeCatalogo)obj;
            return this.tabla.Equals(cc.getTabla()) && this.ide == cc.getIde();
        }
        else return false;
    }
    public override string ToString()
    {
        return nombre;
    }
}