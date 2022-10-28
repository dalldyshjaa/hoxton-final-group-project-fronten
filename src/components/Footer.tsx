import "../styles/Footer.css";
import { FacebookIcon, GmailIcon, TwitterIcon } from "../Icons";
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer_section">
          <ul className="footer_list">
            <li>
              <h4>Support</h4>
            </li>
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Safety information</li>
            <li>Supporting people with disabilities</li>
            <li>Cancellation options</li>
            <li>Our COVID - 19 Response</li>
            <li>Report a neighborhood concern</li>
          </ul>
          <ul className="footer_list">
            <li>
              <h4>Community</h4>
            </li>
            <li>Windbnb.org: disaster relief housing</li>
            <li>Support Afghan refugees</li>
            <li>Hoxton Academy</li>
          </ul>
          <ul className="footer_list">
            <li>
              <h4>Hosting</h4>
            </li>
            <li>Why host</li>
            <li>Responsible hosting</li>
            <li>Community Center</li>
            <li>Host an experience</li>
            <li>Open Homes</li>
            <li>Host an online experience</li>
          </ul>
          <ul className="footer_list">
            <li>
              <h4>Windbnb</h4>
            </li>
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Gift cards</li>
          </ul>
        </div>
        <div className="horizontal">
          <div className="horizontal_line"></div>
        </div>
        <div className="footer_section_">
          <ul className="footer_list_2">
            <li className="footer_title">
              <h4>Windbnb 2021</h4>
            </li>
            <div className="footer_section_1">
              <li>© 2022 Airbnb, Inc.</li>
              <li>· Privacy</li>
              <li>· Terms</li>
              <li>· Sitemap</li>
            </div>
            <div className="footer_section_2">
              <li>English (US)</li>
              <li>$ USD</li>
              <li>
                <FacebookIcon />
              </li>
              <li>
                <TwitterIcon />
              </li>
              <li>
                <GmailIcon />
              </li>
            </div>
          </ul>
        </div>
      </footer>
    </>
  );
}
