<%@ Page Language="C#" AutoEventWireup="true" CodeFile="kendo_grid.aspx.cs" Inherits="FILE_Costeo_kendo_grid" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	

     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

      <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 
    

        <link rel="stylesheet" href="../../KendoUI/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="../../KendoUI/styles/kendo.default.min.css" />
    <link rel="stylesheet" href="../../KendoUI/styles/kendo.default.mobile.min.css" />      

       <script src="../../KendoUI/lib/jquery.min.js"></script>
    <script src="../../KendoUI/lib/kendo.all.min.js"></script>  
    <script src="../../KendoUI/js/kendo.web.min.js"></script> 
   
   <%-- <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>--%>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 

    <script src="Kendo_grid.js"></script>
</head>
<body>    
    <div>
     <table id="grid">               
                <thead>
                    <tr>
                        <th data-field="make">Car Make</th>
                        <th data-field="model">Car Model</th>
                        <th data-field="year">Year</th>
                        <th data-field="category">Category</th>
                        <th data-field="airconditioner">Air Conditioner</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Volvo</td>
                        <td>S60</td>
                        <td>2010</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Audi</td>
                        <td>A4</td>
                        <td>2002</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>BMW</td>
                        <td>535d</td>
                        <td>2006</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>BMW</td>
                        <td>320d</td>
                        <td>2006</td>
                        <td>Saloon</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>VW</td>
                        <td>Passat</td>
                        <td>2007</td>
                        <td>Saloon</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>VW</td>
                        <td>Passat</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Peugeot</td>
                        <td>407</td>
                        <td>2006</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Honda</td>
                        <td>Accord</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Alfa Romeo</td>
                        <td>159</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Nissan</td>
                        <td>Almera</td>
                        <td>2001</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Mitsubishi</td>
                        <td>Lancer</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Opel</td>
                        <td>Vectra</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Toyota</td>
                        <td>Avensis</td>
                        <td>2006</td>
                        <td>Saloon</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Toyota</td>
                        <td>Avensis</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Toyota</td>
                        <td>Avensis</td>
                        <td>2008</td>
                        <td>Saloon</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Audi</td>
                        <td>Q7</td>
                        <td>2007</td>
                        <td>SUV</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Hyundai</td>
                        <td>Santa Fe</td>
                        <td>2012</td>
                        <td>SUV</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Hyundai</td>
                        <td>Santa Fe</td>
                        <td>2013</td>
                        <td>SUV</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Nissan</td>
                        <td>Qashqai</td>
                        <td>2007</td>
                        <td>SUV</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Mercedez</td>
                        <td>B Class</td>
                        <td>2007</td>
                        <td>Hatchback</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Lancia</td>
                        <td>Ypsilon</td>
                        <td>2006</td>
                        <td>Hatchback</td>
                        <td>Yes</td>
                    </tr>
                </tbody>
            </table>
    </div>
    
</body>
</html>
