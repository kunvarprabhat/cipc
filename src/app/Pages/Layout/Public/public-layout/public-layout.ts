import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ChatBot } from "../chat-bot/chat-bot";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Home } from "../../../Views/Public/home/home";

@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, ChatBot, RouterOutlet, CommonModule, ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})
export class PublicLayout {
  constructor(private router: Router) {}

  openLogin(type: string) {
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  openEnquiry() {
    // Navigate to contact page for enquiry
    this.router.navigate(['/contact']);
  }
certificates = [
    {
      image: "https://readdy.ai/api/search-image?query=Professional%20ISO%209001%202015%20certification%20document%2C%20official%20quality%20management%20certificate%2C%20clean%20white%20background%2C%20business%20certification&width=300&height=400&seq=cert1&orientation=portrait",
      title: "ISO 9001:2015 Certified",
      description: "Quality Management System"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Medical%20education%20board%20certificate%2C%20official%20healthcare%20training%20authorization%20document%2C%20professional%20certification%2C%20clean%20background&width=300&height=400&seq=cert2&orientation=portrait",
      title: "Government Recognition",
      description: "Authorized Training Institute"
    },
    {
      image: "https://readdy.ai/api/search-image?query=University%20affiliation%20certificate%2C%20medical%20education%20partnership%20document%2C%20official%20academic%20recognition%2C%20professional%20background&width=300&height=400&seq=cert3&orientation=portrait",
      title: "University Affiliation",
      description: "Academic Excellence"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Healthcare%20training%20accreditation%20certificate%2C%20medical%20education%20quality%20assurance%20document%2C%20professional%20certification%20background&width=300&height=400&seq=cert4&orientation=portrait",
      title: "Accreditation Certificate",
      description: "Training Standards"
    }
  ];

  features = [
    { icon: "ri-graduation-cap-line", title: "Expert Faculty", description: "Experienced professionals with industry expertise" },
    { icon: "ri-microscope-line", title: "Modern Labs", description: "State-of-the-art equipment and facilities" },
    { icon: "ri-award-line", title: "100% Placement", description: "Guaranteed job placement assistance" },
    { icon: "ri-shield-check-line", title: "ISO Certified", description: "Quality assured education standards" }
  ];

  courses = [
    {
      title: "Medical Laboratory Technology",
      duration: "2 Years",
      image: "https://readdy.ai/api/search-image?query=Medical%20laboratory%20technician%20working%20with%20modern%20equipment%2C%20healthcare%20professional%20in%20lab%20coat%2C%20clean%20medical%20laboratory%20setting&width=400&height=250&seq=course1&orientation=landscape"
    },
    {
      title: "X-Ray Technology",
      duration: "1 Year",
      image: "https://readdy.ai/api/search-image?query=X-ray%20technician%20operating%20medical%20imaging%20equipment%2C%20healthcare%20professional%20with%20radiography%20machine%2C%20modern%20medical%20facility&width=400&height=250&seq=course2&orientation=landscape"
    },
    {
      title: "Operation Theatre Technology",
      duration: "2 Years",
      image: "https://readdy.ai/api/search-image?query=Operation%20theatre%20technician%20preparing%20surgical%20equipment%2C%20medical%20professional%20in%20sterile%20environment%2C%20modern%20surgical%20facility&width=400&height=250&seq=course3&orientation=landscape"
    }
  ];
}
