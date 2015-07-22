/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var aa = $.fn.jquery.split(' ')[0].split('.')
  if ((aa[0] < 2 && aa[1] < 9) || (aa[0] == 1 && aa[1] == 9 && aa[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery aa 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: bv.js v3.3.5
 * http://getbootstrap.com/javascript/#bvs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function bvEnd() {
    var el = document.createElement('bootstrap')

    var ab = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'bvend',
      OTransition      : 'oTransitionEnd obvend',
      bv       : 'bvend'
    }

    for (var ac in ab) {
      if (el.style[ac] !== undefined) {
        return { end: ab[ac] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-bvs
  $.fn.emulateTransitionEnd = function (duration) {
    var ad = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { ad = true })
    var ae = function () { if (!ad) $($el).ch($.support.bv.end) }
    setTimeout(ae, duration)
    return this
  }

  $(function () {
    $.support.bv = bvEnd()

    if (!$.support.bv) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.bv.end,
      delegateType: $.support.bv.end,
      handle: function (e) {
        if ($(e.bm).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var af = '[ai-af="alert"]'
  var ag   = function (el) {
    $(el).on('click', af, this.close)
  }

  ag.VERSION = '3.3.5'

  ag.TRANSITION_DURATION = 150

  ag.prototype.close = function (e) {
    var $this    = $(this)
    var ah = $this.attr('ai-bm')

    if (!ah) {
      ah = $this.attr('bb')
      ah = ah && ah.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(ah)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.ch(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up ai
      $parent.detach().ch('closed.bs.alert').remove()
    }

    $.support.bv && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(ag.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(bn) {
    return this.each(function () {
      var $this = $(this)
      var ai  = $this.ai('bs.alert')

      if (!ai) $this.ai('bs.alert', (ai = new ag(this)))
      if (typeof bn == 'string') ai[bn].call($this)
    })
  }

  var aj = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = ag


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = aj
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.ai-api', af, ag.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var ak = function (element, an) {
    this.$element  = $(element)
    this.an   = $.extend({}, ak.DEFAULTS, an)
    this.isLoading = false
  }

  ak.VERSION  = '3.3.5'

  ak.DEFAULTS = {
    loadingText: 'loading...'
  }

  ak.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var al  = $el.is('input') ? 'al' : 'html'
    var ai = $el.ai()

    state += 'Text'

    if (ai.resetText == null) $el.ai('resetText', $el[al]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[al](ai[state] == null ? this.an[state] : ai[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  ak.prototype.bp = function () {
    var am = true
    var $parent = this.$element.closest('[ai-bp="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) am = false
        $parent.find('.ec').removeClass('ec')
        this.$element.addClass('ec')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('ec')) am = false
        this.$element.bpClass('ec')
      }
      $input.prop('checked', this.$element.hasClass('ec'))
      if (am) $input.ch('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('ec'))
      this.$element.bpClass('ec')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.button')
      var an = typeof bn == 'object' && bn

      if (!ai) $this.ai('bs.button', (ai = new ak(this, an)))

      if (bn == 'bp') ai.bp()
      else if (bn) ai.setState(bn)
    })
  }

  var aj = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = ak


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = aj
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.ai-api', '[ai-bp^="button"]', function (e) {
      var $btn = $(e.bm)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'bp')
      if (!($(e.bm).is('input[type="radio"]') || $(e.bm).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.ai-api blur.bs.button.ai-api', '[ai-bp^="button"]', function (e) {
      $(e.bm).closest('.btn').bpClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var ao = function (element, an) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.an     = an
    this.paused      = null
    this.sliding     = null
    this.interal    = null
    this.$ec     = null
    this.$items      = null

    this.an.cmboard && this.$element.on('cmdown.bs.carousel', $.proxy(this.cmdown, this))

    this.an.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  ao.VERSION  = '3.3.5'

  ao.TRANSITION_DURATION = 600

  ao.DEFAULTS = {
    interal: 5000,
    pause: 'hover',
    wrap: true,
    cmboard: true
  }

  ao.prototype.cmdown = function (e) {
    if (/input|textarea/i.test(e.bm.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  ao.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interal && clearInteral(this.interal)

    this.an.interal
      && !this.paused
      && (this.interal = setInteral($.proxy(this.next, this), this.an.interal))

    return this
  }

  ao.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.bt(item || this.$ec)
  }

  ao.prototype.getItemForDirection = function (av, ec) {
    var ap = this.getItemIndex(ec)
    var aq = (av == 'prev' && ap === 0)
                || (av == 'next' && ap == (this.$items.length - 1))
    if (aq && !this.an.wrap) return ec
    var ar = av == 'prev' ? -1 : 1
    var as = (ap + ar) % this.$items.length
    return this.$items.eq(as)
  }

  ao.prototype.to = function (cs) {
    var at        = this
    var ap = this.getItemIndex(this.$ec = this.$element.find('.item.ec'))

    if (cs > (this.$items.length - 1) || cs < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { at.to(cs) }) // yes, "slid"
    if (ap == cs) return this.pause().cycle()

    return this.slide(cs > ap ? 'next' : 'prev', this.$items.eq(cs))
  }

  ao.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.bv) {
      this.$element.ch($.support.bv.end)
      this.cycle(true)
    }

    this.interal = clearInteral(this.interal)

    return this
  }

  ao.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  ao.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  ao.prototype.slide = function (type, next) {
    var $ec   = this.$element.find('.item.ec')
    var $next     = next || this.getItemForDirection(type, $ec)
    var au = this.interal
    var av = type == 'next' ? 'left' : 'right'
    var at      = this

    if ($next.hasClass('ec')) return (this.sliding = false)

    var aw = $next[0]
    var ax = $.Event('slide.bs.carousel', {
      aw: aw,
      av: av
    })
    this.$element.ch(ax)
    if (ax.isDefaultPrevented()) return

    this.sliding = true

    au && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.ec').removeClass('ec')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('ec')
    }

    var ay = $.Event('slid.bs.carousel', { aw: aw, av: av }) // yes, "slid"
    if ($.support.bv && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].emWidth // force reflow
      $ec.addClass(av)
      $next.addClass(av)
      $ec
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, av].join(' ')).addClass('ec')
          $ec.removeClass(['ec', av].join(' '))
          at.sliding = false
          setTimeout(function () {
            at.$element.ch(ay)
          }, 0)
        })
        .emulateTransitionEnd(ao.TRANSITION_DURATION)
    } else {
      $ec.removeClass('ec')
      $next.addClass('ec')
      this.sliding = false
      this.$element.ch(ay)
    }

    au && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.carousel')
      var an = $.extend({}, ao.DEFAULTS, $this.ai(), typeof bn == 'object' && bn)
      var az  = typeof bn == 'string' ? bn : an.slide

      if (!ai) $this.ai('bs.carousel', (ai = new ao(this, an)))
      if (typeof bn == 'number') ai.to(bn)
      else if (az) ai[az]()
      else if (an.interal) ai.pause().cycle()
    })
  }

  var aj = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = ao


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = aj
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var ba = function (e) {
    var bb
    var $this   = $(this)
    var $bm = $($this.attr('ai-bm') || (bb = $this.attr('bb')) && bb.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$bm.hasClass('carousel')) return
    var an = $.extend({}, $bm.ai(), $this.ai())
    var bc = $this.attr('ai-slide-to')
    if (bc) an.interal = false

    Plugin.call($bm, an)

    if (bc) {
      $bm.ai('bs.carousel').to(bc)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.ai-api', '[ai-slide]', ba)
    .on('click.bs.carousel.ai-api', '[ai-slide-to]', ba)

  $(window).on('load', function () {
    $('[ai-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.ai())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var bd = function (element, an) {
    this.$element      = $(element)
    this.an       = $.extend({}, bd.DEFAULTS, an)
    this.$ch      = $('[ai-bp="collapse"][bb="#' + element.id + '"],' +
                           '[ai-bp="collapse"][ai-bm="#' + element.id + '"]')
    this.bving = null

    if (this.an.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndbddClass(this.$element, this.$ch)
    }

    if (this.an.bp) this.bp()
  }

  bd.VERSION  = '3.3.5'

  bd.TRANSITION_DURATION = 350

  bd.DEFAULTS = {
    bp: true
  }

  bd.prototype.bi = function () {
    var be = this.$element.hasClass('cz')
    return be ? 'cz' : 'da'
  }

  bd.prototype.show = function () {
    if (this.bving || this.$element.hasClass('in')) return

    var bf
    var bg = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (bg && bg.length) {
      bf = bg.ai('bs.collapse')
      if (bf && bf.bving) return
    }

    var bh = $.Event('show.bs.collapse')
    this.$element.ch(bh)
    if (bh.isDefaultPrevented()) return

    if (bg && bg.length) {
      Plugin.call(bg, 'hide')
      bf || bg.ai('bs.collapse', null)
    }

    var bi = this.bi()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[bi](0)
      .attr('aria-expanded', true)

    this.$ch
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.bving = 1

    var bj = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[bi]('')
      this.bving = 0
      this.$element
        .ch('shown.bs.collapse')
    }

    if (!$.support.bv) return bj.call(this)

    var bk = $.camelCase(['dk', bi].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(bj, this))
      .emulateTransitionEnd(bd.TRANSITION_DURATION)[bi](this.$element[0][bk])
  }

  bd.prototype.hide = function () {
    if (this.bving || !this.$element.hasClass('in')) return

    var bh = $.Event('hide.bs.collapse')
    this.$element.ch(bh)
    if (bh.isDefaultPrevented()) return

    var bi = this.bi()

    this.$element[bi](this.$element[bi]())[0].emHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$ch
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.bving = 1

    var bj = function () {
      this.bving = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .ch('hidden.bs.collapse')
    }

    if (!$.support.bv) return bj.call(this)

    this.$element
      [bi](0)
      .one('bsTransitionEnd', $.proxy(bj, this))
      .emulateTransitionEnd(bd.TRANSITION_DURATION)
  }

  bd.prototype.bp = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  bd.prototype.getParent = function () {
    return $(this.an.parent)
      .find('[ai-bp="collapse"][ai-parent="' + this.an.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndbddClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  bd.prototype.addAriaAndbddClass = function ($element, $ch) {
    var bl = $element.hasClass('in')

    $element.attr('aria-expanded', bl)
    $ch
      .bpClass('collapsed', !bl)
      .attr('aria-expanded', bl)
  }

  function getTargetFromTrigger($ch) {
    var bb
    var bm = $ch.attr('ai-bm')
      || (bb = $ch.attr('bb')) && bb.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(bm)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.collapse')
      var an = $.extend({}, bd.DEFAULTS, $this.ai(), typeof bn == 'object' && bn)

      if (!ai && an.bp && /show|hide/.test(bn)) an.bp = false
      if (!ai) $this.ai('bs.collapse', (ai = new bd(this, an)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = bd


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = aj
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.ai-api', '[ai-bp="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('ai-bm')) e.preventDefault()

    var $bm = getTargetFromTrigger($this)
    var ai    = $bm.ai('bs.collapse')
    var bn  = ai ? 'bp' : $this.ai()

    Plugin.call($bm, bn)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var bo = '.dropdown-bo'
  var bp   = '[ai-bp="dropdown"]'
  var bq = function (element) {
    $(element).on('click.bs.dropdown', this.bp)
  }

  bq.VERSION = '3.3.5'

  function getParent($this) {
    var ah = $this.attr('ai-bm')

    if (!ah) {
      ah = $this.attr('bb')
      ah = ah && /#[A-Za-z]/.test(ah) && ah.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = ah && $(ah)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(bo).remove()
    $(bp).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var aw = { aw: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.bm.tagName) && $.contains($parent[0], e.bm)) return

      $parent.ch(e = $.Event('hide.bs.dropdown', aw))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').ch('hidden.bs.dropdown', aw)
    })
  }

  bq.prototype.bp = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var br = $parent.hasClass('open')

    clearMenus()

    if (!br) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a bo because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-bo')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var aw = { aw: this }
      $parent.ch(e = $.Event('show.bs.dropdown', aw))

      if (e.isDefaultPrevented()) return

      $this
        .ch('focus')
        .attr('aria-expanded', 'true')

      $parent
        .bpClass('open')
        .ch('shown.bs.dropdown', aw)
    }

    return false
  }

  bq.prototype.cmdown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.bm.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var br = $parent.hasClass('open')

    if (!br && e.which != 27 || br && e.which == 27) {
      if (e.which == 27) $parent.find(bp).ch('focus')
      return $this.ch('click')
    }

    var bs = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + bs)

    if (!$items.length) return

    var bt = $items.bt(e.bm)

    if (e.which == 38 && bt > 0)                 bt--         // up
    if (e.which == 40 && bt < $items.length - 1) bt++         // down
    if (!~bt)                                    bt = 0

    $items.eq(bt).ch('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(bn) {
    return this.each(function () {
      var $this = $(this)
      var ai  = $this.ai('bs.dropdown')

      if (!ai) $this.ai('bs.dropdown', (ai = new bq(this)))
      if (typeof bn == 'string') ai[bn].call($this)
    })
  }

  var aj = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = bq


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = aj
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.ai-api', clearMenus)
    .on('click.bs.dropdown.ai-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.ai-api', bp, bq.prototype.bp)
    .on('cmdown.bs.dropdown.ai-api', bp, bq.prototype.cmdown)
    .on('cmdown.bs.dropdown.ai-api', '.dropdown-menu', bq.prototype.cmdown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var bu = function (element, an) {
    this.an             = an
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$bo           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.ce      = 0
    this.ignoreBackdropClick = false

    if (this.an.remote) {
      this.$element
        .find('.modal-dt')
        .load(this.an.remote, $.proxy(function () {
          this.$element.ch('loaded.bs.modal')
        }, this))
    }
  }

  bu.VERSION  = '3.3.5'

  bu.TRANSITION_DURATION = 300
  bu.BACKDROP_TRANSITION_DURATION = 150

  bu.DEFAULTS = {
    bo: true,
    cmboard: true,
    show: true
  }

  bu.prototype.bp = function (_aw) {
    return this.isShown ? this.hide() : this.show(_aw)
  }

  bu.prototype.show = function (_aw) {
    var at = this
    var e    = $.Event('show.bs.modal', { aw: _aw })

    this.$element.ch(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.af.bs.modal', '[ai-af="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.af.bs.modal', function () {
      at.$element.one('mouseup.af.bs.modal', function (e) {
        if ($(e.bm).is(at.$element)) at.ignoreBackdropClick = true
      })
    })

    this.bo(function () {
      var bv = $.support.bv && at.$element.hasClass('fade')

      if (!at.$element.parent().length) {
        at.$element.appendTo(at.$body) // don't move modals dom csition
      }

      at.$element
        .show()
        .dkTop(0)

      at.adjustDialog()

      if (bv) {
        at.$element[0].emWidth // force reflow
      }

      at.$element.addClass('in')

      at.enforceFocus()

      var e = $.Event('shown.bs.modal', { aw: _aw })

      bv ?
        at.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            at.$element.ch('focus').ch(e)
          })
          .emulateTransitionEnd(bu.TRANSITION_DURATION) :
        at.$element.ch('focus').ch(e)
    })
  }

  bu.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.ch(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.af.bs.modal')
      .off('mouseup.af.bs.modal')

    this.$dialog.off('mousedown.af.bs.modal')

    $.support.bv && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hidebu, this))
        .emulateTransitionEnd(bu.TRANSITION_DURATION) :
      this.hidebu()
  }

  bu.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.bm && !this.$element.has(e.bm).length) {
          this.$element.ch('focus')
        }
      }, this))
  }

  bu.prototype.escape = function () {
    if (this.isShown && this.an.cmboard) {
      this.$element.on('cmdown.af.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('cmdown.af.bs.modal')
    }
  }

  bu.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  bu.prototype.hidebu = function () {
    var at = this
    this.$element.hide()
    this.bo(function () {
      at.$body.removeClass('modal-open')
      at.resetAdjustments()
      at.resetScrollbar()
      at.$element.ch('hidden.bs.modal')
    })
  }

  bu.prototype.removeBackdrop = function () {
    this.$bo && this.$bo.remove()
    this.$bo = null
  }

  bu.prototype.bo = function (ae) {
    var at = this
    var bw = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.an.bo) {
      var bx = $.support.bv && bw

      this.$bo = $(document.createElement('div'))
        .addClass('modal-bo ' + bw)
        .appendTo(this.$body)

      this.$element.on('click.af.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.bm !== e.currentTarget) return
        this.an.bo == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (bx) this.$bo[0].emWidth // force reflow

      this.$bo.addClass('in')

      if (!ae) return

      bx ?
        this.$bo
          .one('bsTransitionEnd', ae)
          .emulateTransitionEnd(bu.BACKDROP_TRANSITION_DURATION) :
        ae()

    } else if (!this.isShown && this.$bo) {
      this.$bo.removeClass('in')

      var aeRemove = function () {
        at.removeBackdrop()
        ae && ae()
      }
      $.support.bv && this.$element.hasClass('fade') ?
        this.$bo
          .one('bsTransitionEnd', aeRemove)
          .emulateTransitionEnd(bu.BACKDROP_TRANSITION_DURATION) :
        aeRemove()

    } else if (ae) {
      ae()
    }
  }

  // these following methods are used to handle overflowing modals

  bu.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  bu.prototype.adjustDialog = function () {
    var bz = this.$element[0].dkHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && bz ? this.ce : '',
      paddingRight: this.bodyIsOverflowing && !bz ? this.ce : ''
    })
  }

  bu.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  bu.prototype.checkScrollbar = function () {
    var ca = window.innerWidth
    if (!ca) { // workaround for missing window.innerWidth in IE8
      var cb = document.documentElement.getBoundingClientRect()
      ca = cb.right - Math.abs(cb.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < ca
    this.ce = this.measureScrollbar()
  }

  bu.prototype.setScrollbar = function () {
    var cc = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', cc + this.ce)
  }

  bu.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  bu.prototype.measureScrollbar = function () { // thx walsh
    var cd = document.createElement('div')
    cd.className = 'modal-dkbar-measure'
    this.$body.append(cd)
    var ce = cd.emWidth - cd.clientWidth
    this.$body[0].removeChild(cd)
    return ce
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(bn, _aw) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.modal')
      var an = $.extend({}, bu.DEFAULTS, $this.ai(), typeof bn == 'object' && bn)

      if (!ai) $this.ai('bs.modal', (ai = new bu(this, an)))
      if (typeof bn == 'string') ai[bn](_aw)
      else if (an.show) ai.show(_aw)
    })
  }

  var aj = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = bu


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = aj
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.ai-api', '[ai-bp="modal"]', function (e) {
    var $this   = $(this)
    var bb    = $this.attr('bb')
    var $bm = $($this.attr('ai-bm') || (bb && bb.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var bn  = $bm.ai('bs.modal') ? 'bp' : $.extend({ remote: !/#/.test(bb) && bb }, $bm.ai(), $this.ai())

    if ($this.is('a')) e.preventDefault()

    $bm.one('show.bs.modal', function (ef) {
      if (ef.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $bm.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.ch('focus')
      })
    })
    Plugin.call($bm, bn, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var cf = function (element, an) {
    this.type       = null
    this.an    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, an)
  }

  cf.VERSION  = '3.3.5'

  cf.TRANSITION_DURATION = 150

  cf.DEFAULTS = {
    animation: true,
    cp: 'top',
    ah: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    ch: 'hover focus',
    dg: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      ah: 'body',
      padding: 0
    }
  }

  cf.prototype.init = function (type, element, an) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.an   = this.getOptions(an)
    this.$viewport = this.an.viewport && $($.isFunction(this.an.viewport) ? this.an.viewport.call(this, this.$element) : (this.an.viewport.ah || this.an.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.an.ah) {
      throw new Error('`ah` bn must be specified when ej ' + this.type + ' on the window.document object!')
    }

    var cg = this.an.ch.split(' ')

    for (var i = cg.length; i--;) {
      var ch = cg[i]

      if (ch == 'click') {
        this.$element.on('click.' + this.type, this.an.ah, $.proxy(this.bp, this))
      } else if (ch != 'manual') {
        var ci  = ch == 'hover' ? 'mouseenter' : 'focusin'
        var cj = ch == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(ci  + '.' + this.type, this.an.ah, $.proxy(this.enter, this))
        this.$element.on(cj + '.' + this.type, this.an.ah, $.proxy(this.leave, this))
      }
    }

    this.an.ah ?
      (this._an = $.extend({}, this.an, { ch: 'manual', ah: '' })) :
      this.fixTitle()
  }

  cf.prototype.getDefaults = function () {
    return cf.DEFAULTS
  }

  cf.prototype.getOptions = function (an) {
    an = $.extend({}, this.getDefaults(), this.$element.ai(), an)

    if (an.delay && typeof an.delay == 'number') {
      an.delay = {
        show: an.delay,
        hide: an.delay
      }
    }

    return an
  }

  cf.prototype.getDelegateOptions = function () {
    var an  = {}
    var ck = this.getDefaults()

    this._an && $.each(this._an, function (cm, alue) {
      if (ck[cm] != alue) an[cm] = alue
    })

    return an
  }

  cf.prototype.enter = function (obj) {
    var cl = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).ai('bs.' + this.type)

    if (!cl) {
      cl = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).ai('bs.' + this.type, cl)
    }

    if (obj instanceof $.Event) {
      cl.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (cl.tip().hasClass('in') || cl.hoverState == 'in') {
      cl.hoverState = 'in'
      return
    }

    clearTimeout(cl.timeout)

    cl.hoverState = 'in'

    if (!cl.an.delay || !cl.an.delay.show) return cl.show()

    cl.timeout = setTimeout(function () {
      if (cl.hoverState == 'in') cl.show()
    }, cl.an.delay.show)
  }

  cf.prototype.isInStateTrue = function () {
    for (var cm in this.inState) {
      if (this.inState[cm]) return true
    }

    return false
  }

  cf.prototype.leave = function (obj) {
    var cl = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).ai('bs.' + this.type)

    if (!cl) {
      cl = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).ai('bs.' + this.type, cl)
    }

    if (obj instanceof $.Event) {
      cl.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (cl.isInStateTrue()) return

    clearTimeout(cl.timeout)

    cl.hoverState = 'out'

    if (!cl.an.delay || !cl.an.delay.hide) return cl.hide()

    cl.timeout = setTimeout(function () {
      if (cl.hoverState == 'out') cl.hide()
    }, cl.an.delay.hide)
  }

  cf.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.ch(e)

      var cn = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !cn) return
      var at = this

      var $tip = this.tip()

      var co = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', co)
      this.$element.attr('aria-bsribedby', co)

      if (this.an.animation) $tip.addClass('fade')

      var cp = typeof this.an.cp == 'function' ?
        this.an.cp.call(this, $tip[0], this.$element[0]) :
        this.an.cp

      var cq = /\s?auto?\s?/i
      var cr = cq.test(cp)
      if (cr) cp = cp.replace(cq, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(cp)
        .ai('bs.' + this.type, this)

      this.an.container ? $tip.appendTo(this.an.container) : $tip.insertAfter(this.$element)
      this.$element.ch('inserted.bs.' + this.type)

      var cs          = this.getPosition()
      var ct  = $tip[0].emWidth
      var cu = $tip[0].emHeight

      if (cr) {
        var cv = cp
        var cw = this.getPosition(this.$viewport)

        cp = cp == 'bottom' && cs.bottom + cu > cw.bottom ? 'top'    :
                    cp == 'top'    && cs.top    - cu < cw.top    ? 'bottom' :
                    cp == 'right'  && cs.right  + ct  > cw.cz  ? 'left'   :
                    cp == 'left'   && cs.left   - ct  < cw.left   ? 'right'  :
                    cp

        $tip
          .removeClass(cv)
          .addClass(cp)
      }

      var cx = this.getCalculatedOffset(cp, cs, ct, cu)

      this.applyPlacement(cx, cp)

      var bj = function () {
        var cy = at.hoverState
        at.$element.ch('shown.bs.' + at.type)
        at.hoverState = null

        if (cy == 'out') at.leave(at)
      }

      $.support.bv && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', bj)
          .emulateTransitionEnd(cf.TRANSITION_DURATION) :
        bj()
    }
  }

  cf.prototype.applyPlacement = function (em, cp) {
    var $tip   = this.tip()
    var cz  = $tip[0].emWidth
    var da = $tip[0].emHeight

    // manually read margins because getBoundingClientRect includes difference
    var db = parseInt($tip.css('margin-top'), 10)
    var dc = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(db))  db  = 0
    if (isNaN(dc)) dc = 0

    em.top  += db
    em.left += dc

    // $.fn.em doesn't round pixel alues
    // so we use setOffset directly with our own function B-0
    $.em.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, em), 0)

    $tip.addClass('in')

    // check to see if placing tip in new em caused the tip to resize itcl
    var ct  = $tip[0].emWidth
    var cu = $tip[0].emHeight

    if (cp == 'top' && cu != da) {
      em.top = em.top + da - cu
    }

    var ar = this.getViewportAdjustedDelta(cp, em, ct, cu)

    if (ar.left) em.left += ar.left
    else em.top += ar.top

    var dd          = /top|bottom/.test(cp)
    var de          = dd ? ar.left * 2 - cz + ct : ar.top * 2 - da + cu
    var df = dd ? 'emWidth' : 'emHeight'

    $tip.em(em)
    this.replaceArrow(de, $tip[0][df], dd)
  }

  cf.prototype.replaceArrow = function (ar, bi, dd) {
    this.arrow()
      .css(dd ? 'left' : 'top', 50 * (1 - ar / bi) + '%')
      .css(dd ? 'top' : 'left', '')
  }

  cf.prototype.setContent = function () {
    var $tip  = this.tip()
    var dg = this.getTitle()

    $tip.find('.tooltip-inner')[this.an.html ? 'html' : 'text'](dg)
    $tip.removeClass('fade in top bottom left right')
  }

  cf.prototype.hide = function (ae) {
    var at = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function bj() {
      if (at.hoverState != 'in') $tip.detach()
      at.$element
        .removeAttr('aria-bsribedby')
        .ch('hidden.bs.' + at.type)
      ae && ae()
    }

    this.$element.ch(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.bv && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', bj)
        .emulateTransitionEnd(cf.TRANSITION_DURATION) :
      bj()

    this.hoverState = null

    return this
  }

  cf.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('dg') || typeof $e.attr('ai-original-dg') != 'string') {
      $e.attr('ai-original-dg', $e.attr('dg') || '').attr('dg', '')
    }
  }

  cf.prototype.hasContent = function () {
    return this.getTitle()
  }

  cf.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var dh = el.tagName == 'BODY'

    var di    = el.getBoundingClientRect()
    if (di.cz == null) {
      // cz and da are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      di = $.extend({}, di, { cz: di.right - di.left, da: di.bottom - di.top })
    }
    var dj  = dh ? { top: 0, left: 0 } : $element.em()
    var dk    = { dk: dh ? document.documentElement.dkTop || document.body.dkTop : $element.dkTop() }
    var dl = dh ? { cz: $(window).cz(), da: $(window).da() } : null

    return $.extend({}, di, dk, dl, dj)
  }

  cf.prototype.getCalculatedOffset = function (cp, cs, ct, cu) {
    return cp == 'bottom' ? { top: cs.top + cs.da,   left: cs.left + cs.cz / 2 - ct / 2 } :
           cp == 'top'    ? { top: cs.top - cu, left: cs.left + cs.cz / 2 - ct / 2 } :
           cp == 'left'   ? { top: cs.top + cs.da / 2 - cu / 2, left: cs.left - ct } :
        /* cp == 'right' */ { top: cs.top + cs.da / 2 - cu / 2, left: cs.left + cs.cz }

  }

  cf.prototype.getViewportAdjustedDelta = function (cp, cs, ct, cu) {
    var ar = { top: 0, left: 0 }
    if (!this.$viewport) return ar

    var dm = this.an.viewport && this.an.viewport.padding || 0
    var cwensions = this.getPosition(this.$viewport)

    if (/right|left/.test(cp)) {
      var do    = cs.top - dm - cwensions.dk
      var dp = cs.top + dm - cwensions.dk + cu
      if (do < cwensions.top) { // top overflow
        ar.top = cwensions.top - do
      } else if (dp > cwensions.top + cwensions.da) { // bottom overflow
        ar.top = cwensions.top + cwensions.da - dp
      }
    } else {
      var dq  = cs.left - dm
      var dr = cs.left + dm + ct
      if (dq < cwensions.left) { // left overflow
        ar.left = cwensions.left - dq
      } else if (dr > cwensions.right) { // right overflow
        ar.left = cwensions.left + cwensions.cz - dr
      }
    }

    return ar
  }

  cf.prototype.getTitle = function () {
    var dg
    var $e = this.$element
    var o  = this.an

    dg = $e.attr('ai-original-dg')
      || (typeof o.dg == 'function' ? o.dg.call($e[0]) :  o.dg)

    return dg
  }

  cf.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  cf.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.an.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` bn must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  cf.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  cf.prototype.enable = function () {
    this.enabled = true
  }

  cf.prototype.disable = function () {
    this.enabled = false
  }

  cf.prototype.bpEnabled = function () {
    this.enabled = !this.enabled
  }

  cf.prototype.bp = function (e) {
    var cl = this
    if (e) {
      cl = $(e.currentTarget).ai('bs.' + this.type)
      if (!cl) {
        cl = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).ai('bs.' + this.type, cl)
      }
    }

    if (e) {
      cl.inState.click = !cl.inState.click
      if (cl.isInStateTrue()) cl.enter(cl)
      else cl.leave(cl)
    } else {
      cl.tip().hasClass('in') ? cl.leave(cl) : cl.enter(cl)
    }
  }

  cf.prototype.destroy = function () {
    var at = this
    clearTimeout(this.timeout)
    this.hide(function () {
      at.$element.off('.' + at.type).removeData('bs.' + at.type)
      if (at.$tip) {
        at.$tip.detach()
      }
      at.$tip = null
      at.$arrow = null
      at.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.tooltip')
      var an = typeof bn == 'object' && bn

      if (!ai && /destroy|hide/.test(bn)) return
      if (!ai) $this.ai('bs.tooltip', (ai = new cf(this, an)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = cf


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = aj
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var ds = function (element, an) {
    this.init('popover', element, an)
  }

  if (!$.fn.tooltip) throw new Error('ds requires tooltip.js')

  ds.VERSION  = '3.3.5'

  ds.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    cp: 'right',
    ch: 'click',
    dt: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-dg"></h3><div class="popover-dt"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  ds.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  ds.prototype.constructor = ds

  ds.prototype.getDefaults = function () {
    return ds.DEFAULTS
  }

  ds.prototype.setContent = function () {
    var $tip    = this.tip()
    var dg   = this.getTitle()
    var dt = this.getContent()

    $tip.find('.popover-dg')[this.an.html ? 'html' : 'text'](dg)
    $tip.find('.popover-dt').children().detach().end()[ // we use append for html objects to maintain js events
      this.an.html ? (typeof dt == 'string' ? 'html' : 'append') : 'text'
    ](dt)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo ah, we have to do
    // this manually by checking the dts.
    if (!$tip.find('.popover-dg').html()) $tip.find('.popover-dg').hide()
  }

  ds.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  ds.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.an

    return $e.attr('ai-dt')
      || (typeof o.dt == 'function' ?
            o.dt.call($e[0]) :
            o.dt)
  }

  ds.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.popover')
      var an = typeof bn == 'object' && bn

      if (!ai && /destroy|hide/.test(bn)) return
      if (!ai) $this.ai('bs.popover', (ai = new ds(this, an)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = ds


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = aj
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: dkspy.js v3.3.5
 * http://getbootstrap.com/javascript/#dkspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, an) {
    this.$body          = $(document.body)
    this.$dkElement = $(element).is(document.body) ? $(window) : $(element)
    this.an        = $.extend({}, ScrollSpy.DEFAULTS, an)
    this.ah       = (this.an.bm || '') + ' .nav li > a'
    this.dz        = []
    this.bms        = []
    this.eb   = null
    this.dkHeight   = 0

    this.$dkElement.on('dk.bs.dkspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    em: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$dkElement[0].dkHeight || Math.max(this.$body[0].dkHeight, document.documentElement.dkHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var at          = this
    var du  = 'em'
    var dv    = 0

    this.dz      = []
    this.bms      = []
    this.dkHeight = this.getScrollHeight()

    if (!$.isWindow(this.$dkElement[0])) {
      du = 'csition'
      dv   = this.$dkElement.dkTop()
    }

    this.$body
      .find(this.ah)
      .map(function () {
        var $el   = $(this)
        var bb  = $el.ai('bm') || $el.attr('bb')
        var $bb = /^#./.test(bb) && $(bb)

        return ($bb
          && $bb.length
          && $bb.is(':visible')
          && [[$bb[du]().top + dv, bb]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        at.dz.push(this[0])
        at.bms.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var dkTop    = this.$dkElement.dkTop() + this.an.em
    var dkHeight = this.getScrollHeight()
    var dy    = this.an.em + dkHeight - this.$dkElement.da()
    var dz      = this.dz
    var bms      = this.bms
    var eb = this.eb
    var i

    if (this.dkHeight != dkHeight) {
      this.refresh()
    }

    if (dkTop >= dy) {
      return eb != (i = bms[bms.length - 1]) && this.activate(i)
    }

    if (eb && dkTop < dz[0]) {
      this.eb = null
      return this.clear()
    }

    for (i = dz.length; i--;) {
      eb != bms[i]
        && dkTop >= dz[i]
        && (dz[i + 1] === undefined || dkTop < dz[i + 1])
        && this.activate(bms[i])
    }
  }

  ScrollSpy.prototype.activate = function (bm) {
    this.eb = bm

    this.clear()

    var ah = this.ah +
      '[ai-bm="' + bm + '"],' +
      this.ah + '[bb="' + bm + '"]'

    var ec = $(ah)
      .parents('li')
      .addClass('ec')

    if (ec.parent('.dropdown-menu').length) {
      ec = ec
        .closest('li.dropdown')
        .addClass('ec')
    }

    ec.ch('activate.bs.dkspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.ah)
      .parentsUntil(this.an.bm, '.ec')
      .removeClass('ec')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.dkspy')
      var an = typeof bn == 'object' && bn

      if (!ai) $this.ai('bs.dkspy', (ai = new ScrollSpy(this, an)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.dkspy

  $.fn.dkspy             = Plugin
  $.fn.dkspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.dkspy.noConflict = function () {
    $.fn.dkspy = aj
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.dkspy.ai-api', function () {
    $('[ai-spy="dk"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.ai())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var ed = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  ed.VERSION = '3.3.5'

  ed.TRANSITION_DURATION = 150

  ed.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var ah = $this.ai('bm')

    if (!ah) {
      ah = $this.attr('bb')
      ah = ah && ah.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('ec')) return

    var $previous = $ul.find('.ec:last a')
    var ee = $.Event('hide.bs.tab', {
      aw: $this[0]
    })
    var ef = $.Event('show.bs.tab', {
      aw: $previous[0]
    })

    $previous.ch(ee)
    $this.ch(ef)

    if (ef.isDefaultPrevented() || ee.isDefaultPrevented()) return

    var $bm = $(ah)

    this.activate($this.closest('li'), $ul)
    this.activate($bm, $bm.parent(), function () {
      $previous.ch({
        type: 'hidden.bs.tab',
        aw: $this[0]
      })
      $this.ch({
        type: 'shown.bs.tab',
        aw: $previous[0]
      })
    })
  }

  ed.prototype.activate = function (element, container, ae) {
    var $ec    = container.find('> .ec')
    var bv = ae
      && $.support.bv
      && ($ec.length && $ec.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $ec
        .removeClass('ec')
        .find('> .dropdown-menu > .ec')
          .removeClass('ec')
        .end()
        .find('[ai-bp="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('ec')
        .find('[ai-bp="tab"]')
          .attr('aria-expanded', true)

      if (bv) {
        element[0].emWidth // reflow for bv
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('ec')
          .end()
          .find('[ai-bp="tab"]')
            .attr('aria-expanded', true)
      }

      ae && ae()
    }

    $ec.length && bv ?
      $ec
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(ed.TRANSITION_DURATION) :
      next()

    $ec.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(bn) {
    return this.each(function () {
      var $this = $(this)
      var ai  = $this.ai('bs.tab')

      if (!ai) $this.ai('bs.tab', (ai = new ed(this)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = ed


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = aj
    return this
  }


  // TAB DATA-API
  // ============

  var ba = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.ai-api', '[ai-bp="tab"]', ba)
    .on('click.bs.tab.ai-api', '[ai-bp="pill"]', ba)

}(jQuery);

/* ========================================================================
 * Bootstrap: ep.js v3.3.5
 * http://getbootstrap.com/javascript/#ep
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var eg = function (element, an) {
    this.an = $.extend({}, eg.DEFAULTS, an)

    this.$bm = $(this.an.bm)
      .on('dk.bs.ep.ai-api', $.proxy(this.checkPosition, this))
      .on('click.bs.ep.ai-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.eped      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  eg.VERSION  = '3.3.5'

  eg.RESET    = 'ep ep-top ep-bottom'

  eg.DEFAULTS = {
    em: 0,
    bm: window
  }

  eg.prototype.getState = function (dkHeight, da, emTop, emBottom) {
    var dkTop    = this.$bm.dkTop()
    var csition     = this.$element.em()
    var bmHeight = this.$bm.da()

    if (emTop != null && this.eped == 'top') return dkTop < emTop ? 'top' : false

    if (this.eped == 'bottom') {
      if (emTop != null) return (dkTop + this.unpin <= csition.top) ? false : 'bottom'
      return (dkTop + bmHeight <= dkHeight - emBottom) ? false : 'bottom'
    }

    var ej   = this.eped == null
    var ek    = ej ? dkTop : csition.top
    var el = ej ? bmHeight : da

    if (emTop != null && dkTop <= emTop) return 'top'
    if (emBottom != null && (ek + el >= dkHeight - emBottom)) return 'bottom'

    return false
  }

  eg.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(eg.RESET).addClass('ep')
    var dkTop = this.$bm.dkTop()
    var csition  = this.$element.em()
    return (this.pinnedOffset = csition.top - dkTop)
  }

  eg.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  eg.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var da       = this.$element.da()
    var em       = this.an.em
    var emTop    = em.top
    var emBottom = em.bottom
    var dkHeight = Math.max($(document).da(), $(document.body).da())

    if (typeof em != 'object')         emBottom = emTop = em
    if (typeof emTop == 'function')    emTop    = em.top(this.$element)
    if (typeof emBottom == 'function') emBottom = em.bottom(this.$element)

    var ep = this.getState(dkHeight, da, emTop, emBottom)

    if (this.eped != ep) {
      if (this.unpin != null) this.$element.css('top', '')

      var epType = 'ep' + (ep ? '-' + ep : '')
      var e         = $.Event(epType + '.bs.ep')

      this.$element.ch(e)

      if (e.isDefaultPrevented()) return

      this.eped = ep
      this.unpin = ep == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(eg.RESET)
        .addClass(epType)
        .ch(epType.replace('ep', 'eped') + '.bs.ep')
    }

    if (ep == 'bottom') {
      this.$element.em({
        top: dkHeight - da - emBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(bn) {
    return this.each(function () {
      var $this   = $(this)
      var ai    = $this.ai('bs.ep')
      var an = typeof bn == 'object' && bn

      if (!ai) $this.ai('bs.ep', (ai = new eg(this, an)))
      if (typeof bn == 'string') ai[bn]()
    })
  }

  var aj = $.fn.ep

  $.fn.ep             = Plugin
  $.fn.ep.Constructor = eg


  // AFFIX NO CONFLICT
  // =================

  $.fn.ep.noConflict = function () {
    $.fn.ep = aj
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[ai-spy="ep"]').each(function () {
      var $spy = $(this)
      var ai = $spy.ai()

      ai.em = ai.em || {}

      if (ai.emBottom != null) ai.em.bottom = ai.emBottom
      if (ai.emTop    != null) ai.em.top    = ai.emTop

      Plugin.call($spy, ai)
    })
  })

}(jQuery);
