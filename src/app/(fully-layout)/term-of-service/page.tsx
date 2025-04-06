import Link from "next/link"
import React from 'react';



export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      <main className="flex-1">
        <section id="terms" className="mb-16">
          <h1 className="text-2xl font-bold mb-4">01. Terms & Condition</h1>
          <p className="text-gray-700 mb-4">
            Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit.
            Sed iaculis molestie arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus bibendum. Duis sit
            amet eros mollis, viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus
            euismod enim. Donec velit tortor, mollis eu tortor euismod, gravida laoreet arcu.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
            <li>
              Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam
              tempus felis ipsum, sagittis malesuada nulla vulputate et.
            </li>
            <li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
            <li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
            <li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
          </ul>
        </section>

        <section id="limitations" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">02. Limitations</h2>
          <p className="text-gray-700 mb-4">
            In pretium est sit amet diam feugiat eleifend. Curabitur consectetur fringilla metus. Morbi hendrerit
            facilisis tincidunt. Sed condimentum laoricia arcu. Ut in iaculis metus. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Fusce vel erat elit. In vitae turpis tempor, accumsan sapien vitae, rutrum
            eros. Integer pulvinar mattis turpis, ac fermentum leo ullamcorper a. Nam finibus eros libero, sit amet
            mattis lacus tristique eu. Donec nec ex convallis, ultricies eros ut, mollis libero. Ut scelerisque lacus
            interdum consectetur sodales.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
            <li>Curabitur luctus sapien augue.</li>
            <li>mattis faucibus nisl vehicula nec, Mauris at scelerisque lorem.</li>
            <li>Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et. Aenean vel metus leo.</li>
            <li>Vivamus nec neque a libero sodales aliquam a et dolor.</li>
          </ul>
        </section>

        <section id="security" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">02. Security</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare
            eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis
            et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.
          </p>
        </section>

        <section id="privacy" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">04. Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            Praesent non sem facilisis, hendrerit nisl vitae, volutpat quam. Aliquam metus mauris, semper eu eros vitae,
            blandit tristique metus. Vestibulum maximus nec justo sed maximus. Vivamus sit amet turpis sem. Integer
            vitae tortor ac ex scelerisque facilisis ac vitae urna. In hac habitasse platea dictumst. Maecenas imperdiet
            tortor arcu, nec tincidunt neque malesuada volutpat.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
            <li>Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
            <li>Aenean vel metus leo.</li>
            <li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
            <li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Fusce rutrum mauris sit amet justo rutrum, ut sodales lorem ullamcorper. Aliquam vitae iaculis urna. Nulla
            vitae mi vel nisl viverra ullamcorper vel elementum est. Mauris vitae elit nec enim tincidunt aliquet. Donec
            ultrices nulla a enim pulvinar, quis pulvinar lacus consectetur. Donec dignissim, risus nec mollis
            efficitur, turpis erat blandit urna, eget elementum lacus lectus eget lorem.
          </p>
        </section>
      </main>

      <aside className="md:w-64 shrink-0">
        <div className="sticky top-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xs uppercase text-gray-500 font-semibold mb-4">TABLE OF CONTENTS</h3>
          <nav className="space-y-2">
            <Link href="#terms" className="block text-sm text-gray-700 hover:text-gray-900">
              01. Terms & Condition
            </Link>
            <Link href="#limitations" className="block text-sm text-gray-700 hover:text-gray-900">
              02. Limitations
            </Link>
            <Link href="#security" className="block text-sm text-gray-700 hover:text-gray-900">
              03. Security
            </Link>
            <Link href="#privacy" className="block text-sm text-gray-700 hover:text-gray-900">
              04. Privacy Policy
            </Link>
          </nav>
        </div>
      </aside>
    </div>
  )
}

