import { File, Folder, Tree } from "@/components/magicui/file-tree";
import IconCloud from "@/components/magicui/icon-cloud";

const slugs = [
  "zod",
  "typescript",
  "javascript",
  "react",
  "git",
  "reactquery",
  "tailwindcss",
  "reacthookform",
  "axios",
  "next.js",
  "jest",
  "turborepo",
  "mailgun",
  "prisma",
  "mongodb",
  "stripe",
  "gmail",
  "nextdotjs"
];


export default function NiwiProjectFile() {
  return (
    <section className="flex flex-col md:flex-row items-center">
      <div className="mt-4 relative flex h-[500px] w-full md:w-1/2 flex-col items-center justify-center overflow-hidden border-[#444950] border-[0.5px] rounded-[12px] bg-background md:shadow-xl">
        <Tree
          className="p-2 overflow-hidden rounded-md bg-background"
          initialSelectedId="7"
          initialExpandedItems={["1", "3", "31"]}
          // elements={ELEMENTS}
        >
          <Folder element="app" value="1">
            <Folder element="(feat)" value="11">
              <Folder element="auth" value="111">
                <File value="1111">
                  <p className="!mb-0">[...page].tsx</p>
                </File>
              </Folder>
              <Folder element="blogs" value="112">
                <File value="1121">
                  <p className="!mb-0">[...page].tsx</p>
                </File>
              </Folder>
              <Folder element="payment" value="113">
                <File value="1131">
                  <p className="!mb-0">[...page].tsx</p>
                </File>
              </Folder>
            </Folder>
            <Folder element="(protected)" value="12">
              <Folder element="dashboard" value="121">
                <Folder element="auth" value="1211">
                  <File value="12111">
                    <p className="!mb-0">[...page].tsx</p>
                  </File>
                </Folder>
                <Folder element="blogs" value="1212">
                  <File value="12121">
                    <p className="!mb-0">[...page].tsx</p>
                  </File>
                </Folder>
                <Folder element="payment" value="1213">
                  <File value="12131">
                    <p className="!mb-0">[...page].tsx</p>
                  </File>
                </Folder>
              </Folder>
            </Folder>
            <File value="13">
              <p className="!mb-0">layout.tsx</p>
            </File>
            <File value="14">
              <p className="!mb-0">page.tsx</p>
            </File>
          </Folder>
          <Folder element="components" value="2">
            <Folder element="niwi-ui" value="21">
              <File value="211">
                <p className="!mb-0">niwi-ui.tsx</p>
              </File>
            </Folder>
            <Folder element="niwi-blog" value="22">
              <File value="221">
                <p className="!mb-0">niwi-blog.tsx</p>
              </File>
            </Folder>
            <Folder element="niwi-payment" value="23">
              <File value="231">
                <p className="!mb-0">niwi-payment.tsx</p>
              </File>
            </Folder>
            <Folder element="niwi-profile" value="24">
              <File value="241">
                <p className="!mb-0">niwi-profile.tsx</p>
              </File>
            </Folder>
            <Folder element="[...other]" value="25"></Folder>
          </Folder>
          <Folder element="feats" value="3">
            <Folder element="blog" value="31">
              <Folder element="actions" value="311">
                <File value="3111">
                  <p className="!mb-0">blog.action.tsx</p>
                </File>
              </Folder>
              <Folder element="api" value="312">
                <File value="3121">
                  <p className="!mb-0">get-blog-comments-by-blog-id.ts</p>
                </File>
                <File value="3122">
                  <p className="!mb-0">[...other-api].ts</p>
                </File>
              </Folder>
              <Folder element="hooks" value="313">
                <File value="3131">
                  <p className="!mb-0">useBlogBookmark.tsx</p>
                </File>
                <File value="3132">
                  <p className="!mb-0">[...otherUseHook].tsx</p>
                </File>
              </Folder>
              <Folder element="services" value="314">
                <File value="3141">
                  <p className="!mb-0">blog-query-cache.service.ts</p>
                </File>
                <File value="3142">
                  <p className="!mb-0">blog.service.ts</p>
                </File>
              </Folder>
              <Folder element="validations" value="315">
                <File value="3151">
                  <p className="!mb-0">blog.validation.ts</p>
                </File>
              </Folder>
            </Folder>
            <Folder element="[...other-feature]" value="32"></Folder>
          </Folder>
          <Folder element="libs" value="4">
            <Folder element="api" value="41">
              <File value="411">
                <p className="!mb-0">api-helper.ts</p>
              </File>
              <File value="412">
                <p className="!mb-0">axios-client.ts</p>
              </File>
              <File value="413">
                <p className="!mb-0">react-query.ts</p>
              </File>
            </Folder>
            <Folder element="auth" value="42">
              <File value="421">
                <p className="!mb-0">niwi-auth-for-edge.ts</p>
              </File>
              <File value="422">
                <p className="!mb-0">niwi-auth.ts</p>
              </File>
            </Folder>
            <Folder element="[...other-helper]" value="43"></Folder>
          </Folder>
          <Folder element="prisma" value="5">
            <File value="51">
              <p className="!mb-0">schema.prisma</p>
            </File>
          </Folder>
          <Folder element="seeds" value="6">
            <File value="61">
              <p className="!mb-0">blog.seed.ts</p>
            </File>
            <File value="62">
              <p className="!mb-0">index.ts</p>
            </File>
            <File value="63">
              <p className="!mb-0">tsconfig.seeder.json</p>
            </File>
            <File value="64">
              <p className="!mb-0">user.seed.ts</p>
            </File>
          </Folder>
          <Folder element="store" value="7">
            <Folder element="app" value="71">
              <File value="711">
                <p className="!mb-0">app.store.ts</p>
              </File>
            </Folder>
            <Folder element="blog" value="72">
              <File value="721">
                <p className="!mb-0">blog.store.ts</p>
              </File>
            </Folder>
            <Folder element="profile" value="74">
              <File value="741">
                <p className="!mb-0">profile.store.ts</p>
              </File>
            </Folder>
          </Folder>
          <Folder element="styles" value="8">
            <File value="81">
              <p className="!mb-0">globals.css</p>
            </File>
            <File value="82">
              <p className="!mb-0">niwi-blog.css</p>
            </File>
            <File value="83">
              <p className="!mb-0">niwi-profile.css</p>
            </File>
            <File value="84">
              <p className="!mb-0">niwi.css</p>
            </File>
          </Folder>
        </Tree>
      </div>
      <div className="relative flex h-full w-full md:w-1/2 items-center justify-center overflow-hidden px-20 pb-10">
        <IconCloud iconSlugs={slugs} />
      </div>
    </section>
  );
}
