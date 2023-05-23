import React from 'react';
import styled from './style.module.css';
import DataTermImPrints from '../../components/dataTermImPrint/DataTermImPrints';
import { Link } from 'react-router-dom';

const Imprint = () => {
  return (
    <>
      <DataTermImPrints />
      <div className={styled.contentBody}>
        <div className={styled.container}>
          <h2>imprint</h2>
          <p>Information according to §5 of the Teleservices Act and the Media State Treaty</p>
          <Link to='/'>https://zizle.de</Link>
          <p>is operated by:</p>
          <p>
            <b>JOOZ YAZILIM BİLİŞİM TEKNOLOJİLERİ DANIŞMANLIK VE TİCARET LİMİTED ŞİRKETİ</b>
          </p>
          <p>
            <b>YENIGUN MAH. MEVLANA CAD. B BLOK NO:54 B/203 – MURATPAŞA</b>
          </p>
          <p>
            <b>ANTALYA / TURKİYE</b>
          </p>
          <table>
            <tbody>
              <tr>
                <td>Tax number:</td>
                <td>4841893031</td>
              </tr>
              <tr>
                <td>Managing Director:</td>
                <td>Halit saree</td>
              </tr>
              <tr>
                <td>Jurisdiction:</td>
                <td>Antalya</td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>info@zizle.de</td>
              </tr>
              <tr>
                <td>Internet</td>
                <td>
                  <a href='https://zizle.de'>https://zizle.de</a>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <h2>About us:</h2>
          <p>
            At Zizle you create a personal profile, browse through hundreds of thousands of
            profiles, receive partner suggestions or go on a playful search.
          </p>
          <h2>Terms of Service:</h2>
          <p>You can find our terms of use here.</p>
          <h2>Liability</h2>
          <p>
            Mit Urteil vom 12. Mai 1998 - 312 O 85/98 - &apos;Haftung für Links&apos; hat das Landgericht
            Hamburg entschieden, dass man durch die Anbringung eines Links die Inhalte der gelinkten
            Seite ggf. mit zu verantworten hat. Dies kann nur dadurch verhindert werden, dass man
            sich ausdrücklich von diesen Inhalten distanziert. Hiermit distanzieren wir uns
            ausdrücklich von allen Inhalten aller gelinkten Seiten auf unserer Internetpräsenz und
            machen uns diese Inhalte nicht zu Eigen. Diese Erklärung gilt für alle auf unserer
            Internetpräsenz publizierten Links und für alle Inhalte der Seiten, zu denen die bei uns
            veröffentlichten Banner und Links führen. Der Service enthält Links zu anderen
            Internet-Sites, Ressourcen und Mitgliedern dieses Service. Wir sind nicht verantwortlich
            für die Verfügbarkeit dieser externen Ressourcen, oder deren Inhalte, die wir darüber
            hinaus nicht notwendigerweise billigen. Wir sind nicht für den Inhalt von Werbung,
            Produkten oder anderen Materialien auf diesen Sites verantwortlich.
          </p>
          <p>
            Under no circumstances shall we be responsible or liable, directly or indirectly, for
            any loss or damage allegedly arising from the use of or reliance on any content, goods
            or services on these sites. Any concerns regarding any external link should be directed
            to the appropriate site administrator or webmaster.
          </p>
          <p>
            We clearly distance ourselves from any illegal, personality-threatening, morally or
            ethically objectionable content. Please inform us if we should link to such an offer.
          </p>
          <p>
            All rights, in particular the right of reproduction and distribution as well as
            translation, are reserved. No part of the work may be reproduced in any form (by
            photocopy, microfilm or any other process) or processed, duplicated or distributed using
            electronic media without the written permission of the authors.
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default Imprint;
