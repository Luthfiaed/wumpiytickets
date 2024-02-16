import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // request is done from next.js server inside a k8s pod
    const k8sServiceName = "ingress-nginx-controller";
    const k8sNamespace = "ingress-nginx";
    return axios.create({
      baseURL: `http://${k8sServiceName}.${k8sNamespace}.svc.cluster.local`,
      headers: req.headers,
    });
  } else {
    // request is done from the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
