import React from 'react';
import ReactDOM from 'react-dom';

const Footer = () => {

    return (
        <footer class="page-footer font-small bg-dark pt-4" id="footer">


  <div class="container-fluid text-center text-md-left text-white">

    <div class="row">

   
      <div class="col-md-6 mt-md-0 mt-3">

        <h5 class="text-uppercase">Kontakt</h5>
        <p>Chętnie odpowiemy na wszystkie pytania !</p>

      </div>
      
      <hr class="clearfix w-100 d-md-none pb-3"/>

     
      <div class="col-md-3 mb-md-0 mb-3">


        <h5 class="text-uppercase">Nasi partnerzy</h5>

        <ul class="list-unstyled">
          <li>
            <a href="https://www.pedigree.pl/">Pedigree</a>
          </li>
          <li>
            <a href="https://www.whiskas.pl/?gclid=Cj0KCQjwmdzzBRC7ARIsANdqRRka0Z2g3BYrfT07reot1owOYr7Ex9Hq59KbpvA5z2bjwGYihFe7B4UaApDGEALw_wcB">Whiskas</a>
          </li>
        </ul>

      </div>
      

     
      <div class="col-md-3 mb-md-0 mb-3">

       
        <h5 class="text-uppercase">Twórcy</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Wojciech Boman</a>
          </li>
          <li>
            <a href="#!">Jakub Szańca</a>
          </li>
          
        </ul>

      </div>
   

    </div>

  </div>
  <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
  </div>

</footer>
    )
}

export default Footer