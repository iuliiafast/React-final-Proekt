import ImgInst from '../../assets/ic-inst.svg'
import ImgWsapp from '../../assets/ic-wsapp.svg'
import styles from './Footer.module.css';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>Contact</h2>
      <div className={styles.boxFooter}>
        <div className={styles.gridFooter}>
          <div className={styles.grid}>
            <p>Phone</p>
            <h3>+49 30 915-88492</h3>
          </div>
          <div className={styles.grid}>
            <p>Socials</p>
            <div>
              <a href="https://www.instagram.com/yourusername/" target="_blank">
                <img src={ImgInst} alt="instagram" className={styles.imgSocial} />
              </a>

              <a href="https://wa.me/79111234567" target="_blank">
                <img src={ImgWsapp} alt="whatsapp" className={styles.imgSocial} />
              </a>

            </div>
          </div>
          <div className={styles.grid}>
            <p>Address</p>
            <h3>Wallstraẞe 9-13, 10179 Berlin,
              <br></br>
              Deutschland</h3>
          </div>
          <div className={styles.grid}>
            <p>Working Hours</p>
            <h3>24 hours a day</h3>
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7980541597695!2d13.411708115915275!3d52.51418307981239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c9e098c6d1%3A0x421b1f5741d50a0!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1641229612815!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>


      </div>
    </footer >
  );
}