import{d as t,c as a,E as e}from"./common-a14a00e4.js";var s={components:{}};const r='{"title":"useUrlState","frontmatter":{},"headers":[{"level":2,"title":"安装","slug":"安装"},{"level":2,"title":"使用","slug":"使用"},{"level":2,"title":"代码演示","slug":"代码演示"},{"level":3,"title":"默认用法","slug":"默认用法"},{"level":2,"title":"API","slug":"api"},{"level":3,"title":"参数","slug":"参数"},{"level":3,"title":"Options","slug":"options"},{"level":3,"title":"结果","slug":"结果"}],"relativePath":"src/hooks/useUrlState/readme.md","lastUpdated":1602162468545.8584}',d=e('<h1 id="useurlstate"><a class="header-anchor" href="#useurlstate" aria-hidden="true">#</a> useUrlState</h1><p>一个同步组件内部状态和 query 参数的 hook。</p><h2 id="安装"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash"><pre><code><span class="token function">npm</span> i @ahooksjs/use-url-state -S\n</code></pre></div><blockquote><p>该 Hooks 基于 <code>react-router</code> 的 useLocation &amp; useHistory 进行 query 管理，所以使用该 Hooks 之前，你需要保证</p><p>1. 你项目正在使用 <code>react-router</code> 5.0 以上版本来管理路由</p><p>2. 独立安装了 @ahooksjs/use-url-state</p></blockquote><h2 id="使用"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><div class="language-js"><pre><code><span class="token keyword">import</span> useUrlState <span class="token keyword">from</span> <span class="token string">&#39;@ahooksjs/use-url-state&#39;</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="代码演示"><a class="header-anchor" href="#代码演示" aria-hidden="true">#</a> 代码演示</h2><h3 id="默认用法"><a class="header-anchor" href="#默认用法" aria-hidden="true">#</a> 默认用法</h3><h2 id="api"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><div class="language-typescript"><pre><code><span class="token keyword">const</span> <span class="token punctuation">[</span>state<span class="token punctuation">,</span> setState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useUrlState</span><span class="token punctuation">(</span>initialState<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h3 id="参数"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>initialState</td><td>初始状态</td><td>S | () =&gt; S</td><td>-</td></tr><tr><td>options</td><td>url 配置</td><td>Options</td><td>-</td></tr></tbody></table><h3 id="options"><a class="header-anchor" href="#options" aria-hidden="true">#</a> Options</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>navigateMode</td><td>状态变更时切换 history 的方式</td><td>&#39;push&#39; | &#39;replace&#39;</td><td>&#39;push&#39;</td></tr></tbody></table><h3 id="结果"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>state</td><td>url query 对象</td><td>object</td></tr><tr><td>setState</td><td>用法同 useState，但 state 需要是 object</td><td>(state: S) =&gt; void | (() =&gt; ((state: S) =&gt; S))</td></tr></tbody></table>',17);s.render=function(e,s,r,n,o,h){return a(),t("div",null,[d])};export default s;export{r as __pageData};