import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 200 }, // normal load
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/reviews?count=3&id=12');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}