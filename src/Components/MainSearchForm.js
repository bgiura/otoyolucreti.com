import React, { useState } from "react"
import otoyolData from "../Data/otoyollar.json"
import giseData from "../Data/giseler.json"
import girisCikisData from "../Data/gisegiriscikis.json"

const MainSearchForm = () => {

    const [otoyolValue, setOtoyolValue] = useState(null)
    const otoyolHandler = (e) => {
        setOtoyolValue(e.target.value)
    }

    const [giseGirisValue, setGiseGirisValue] = useState()
    const girisGiseHandler = (e) => {
        setGiseGirisValue(e.target.value)
    }

    const [giseCikisValue, setGiseCikisValue] = useState()
    const giseCikisHandler = (e) => {
        setGiseCikisValue(e.target.value)
    }


    const [girisCikis, setGirisCikis] = useState([])
    const [giseKonum1, setGiseKonum1] = useState([])
    const [giseKonum2, setGiseKonum2] = useState([])

    const submitCalculate = (e) => {

        e.preventDefault()

        setGirisCikis(girisCikisData.filter((data) => {
            return data.giris_gise_id == giseGirisValue && data.cikis_gise_id == giseCikisValue
        }))

        setGiseKonum1(giseData.filter((data) => {
            return data.id == giseGirisValue
        }))

        setGiseKonum2(giseData.filter((data) => {
            return data.id == giseCikisValue
        })

        )
    }





    const renderData = (data, index) => {
        return (
            <tr key={index}>
                <td>{data.arac_sinifi}</td>
                <td>{`${data.gise_ucret} ₺`}</td>
                <td>{data.ucret_gecerlilik_tarihi}</td>
            </tr >

        )
    }

    const renderGiseKonum1 = (data, index) => {
        return (
            < td > {data.gise_adi} gişesinin konumu için < a href={`http://www.google.com/maps/place/` + data.gise_konum} target="_blank"> tıklayın </a ></td >
        )
    }

    const renderGiseKonum2 = (data, index) => {
        return (
            < td > {data.gise_adi} gişesinin konumu için < a href={`http://www.google.com/maps/place/` + data.gise_konum} target="_blank"> tıklayın </a ></td >
        )
    }



    return (
        <div className="main-forn d-flex justify-content-center row">
            <div className="container-fluid form-wrapper d-flex justify-content-center row">
                <h5 id="warning" className="mt-2 toggle-warning" style={{ color: "red" }}>Lütfen geçerli bir rota giriniz.</h5>
                <form className="container-fluid m-2 mainForm">

                    <div className="form-group row m-1 ">
                        <label htmlFor="formGroupExampleInput">Otoyol Seçiniz</label>
                        <select className="form-select w-100" id="otoyolSelect" onChange={otoyolHandler}>
                            <option value="" disabled selected hidden>Otoyollar</option>
                            {otoyolData.map((otoyolDetail, otoyolIndex) => {
                                return <option key={otoyolIndex} value={otoyolDetail.otoyol_id}>{otoyolDetail.otoyol_adi}</option>
                            })}
                        </select>
                    </div>

                    <div className="form-group row m-1">
                        <label htmlFor="formGroupExampleInput">Giriş Gişesi Seçiniz</label>
                        <select className="form-select w-100" id="girisGiseSelect" onChange={girisGiseHandler}>
                            <option value="" disabled selected hidden>Giriş Gişe</option>
                            {giseData.map((giseDetail, giseIndex) => {
                                if (otoyolValue == giseDetail.otoyol_id & giseDetail.gise_il !== "İstanbul Yönü") {
                                    return <option key={giseIndex} value={giseDetail.id}>{`${giseDetail.gise_adi} (${giseDetail.gise_il} - ${giseDetail.gise_ilce || ")"}  ${giseDetail.gise_mevkii || ""})`}</option>
                                }
                            })}
                        </select>
                    </div>

                    <div className="form-group row m-1">
                        <label htmlFor="formGroupExampleInput">Çıkış Gişesi Seçiniz</label>
                        <select className="form-select w-100" id="girisGiseSelect" onChange={giseCikisHandler}>
                            <option value="" disabled selected hidden>Çıkış Gişe</option>
                            {giseData.map((giseDetail, giseIndex) => {
                                if (otoyolValue == giseDetail.otoyol_id) {
                                    return <option key={giseIndex} value={giseDetail.id}>{`${giseDetail.gise_adi} (${giseDetail.gise_il} - ${giseDetail.gise_ilce || ""}  ${giseDetail.gise_mevkii || ""})`}</option>
                                }
                            })}
                        </select>
                    </div>
                    <button onClick={submitCalculate} type="button" className="btn btn-primary mt-2">Hesapla</button>
                </form>
                <br />

            </div>

            <div className="d-flex justify-content-center">

                <div className="row">
                    <table className="table w-75">
                        <thead>
                            <tr>
                                <th scope="col">Araç Sınıfı</th>
                                <th scope="col">Toplam Tutar</th>
                                <th scope="col">Ücret Geçerlilik Tarihi</th>
                            </tr>
                        </thead>
                        <tbody id="td-data">
                            {girisCikis.map(renderData)}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <table className="table w-75">
                        <thead>
                            <tr>
                                <th scope="col">Giriş Gişe Konumu</th>
                                <th scope="col">Çıkış Gişe Konumu</th>
                            </tr>
                        </thead>
                        <tbody id="td-data">
                            <tr>
                                {giseKonum1.map(renderGiseKonum1)}
                                {giseKonum2.map(renderGiseKonum2)}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h6>Araç Sınıfları Hakkında Önemli Not</h6>
                <p>1. Sınıf araçlar: Dingil mesafesi 3.50 metreden düşük araçlar. <span style={{ color: "red" }}>Örnek: Binek otomobiller.</span></p>
                <p>2. Sınıf araçlar: Dingil mesafesi 3.50 metreden büyük araçlar.  <span style={{ color: "red" }}>Örnek: Minibüsler.</span></p>
                <p>3. Sınıf araçlar: Dingil sayısı 3 adet olan araçlar.  <span style={{ color: "red" }}>Örnek: Yolcu otobüsleri.</span></p>
                <p>4. Sınıf araçlar: Dingil sayısı 4 veya 5 adet olan araçlar. <span style={{ color: "red" }}>Örnek: Kamyonlar.</span></p>
                <p>5. Sınıf araçlar: Dingil sayısı 6 ve daha fazlası olan araçlar. <span style={{ color: "red" }}>Örnek: Tırlar, treylerler veya dingil sayısı 6'dan fazla olan kamyonlar.</span></p>
                <p>6. Sınıf araçlar: İki tekerleği olan bütün motorlu araçlar <span style={{ color: "red" }}>Örnek: Motosikletler.</span></p>
            </div>

        </div >

    );
}

export default MainSearchForm;