var express         = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        Campground  = require("./models/campground"),
        seedDB      = require("./seeds"),
        Comment = require("./models/comment")
        // User = require("./models/user")
        

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true }));

// var campgrounds = [
//         {name: "Salmon Peak", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"},
//         {name: "Granite Hill", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"},        
//         {name: "Fancy Place", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"}
//         ];
app.set("view engine", "ejs");
// Campground.create(
//     {
        
//         name: "Salmon Creek",
//         image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXGBgXFRYVGBgVFRoYFRcWGBcXGBcYHSggGBolGxUYITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tNy0tLS0uLTUtLS0vLS8vLi0tLS0tLSstLS0tLTAtLS0vLS8tLS0tLS0vLS0tLf/AABEIAJwBQwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EADsQAAIBAwMCBAQDBgYCAwEAAAECEQADIQQSMQVBEyJRYQZxgZEyofAUI0JSscEVYoLR4fEzclOSsgf/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQFAQAG/8QAMREAAQQBAwIEAwkBAQEAAAAAAQACAxEhBBIxQVEFEyJxYYHRFDJCkaGxweHw8aIj/9oADAMBAAIRAxEAPwBApG2KpFsdqTnqBJycU0018RWFI0tFLOfbUr17ZiqtFp/MCeKNvWlYggktJ3CMD0opdPApofTabyjMgATrSlAkCgtT08PmuaW2eaNsv7VNufF6ipevpSezoArTWl6brVEDigb6falhc7vYU5kvnBVhm5q+lafUDbSH4i6gnE0ptdRIWNxpb1Jzvg8/70Ecj99VhFVClxbpJkU10rE4qHQ9AWOBuIG4pEyAVkfYn7e9N9Z0y5bDmCQkA/8AqfwOPUfrFVPjD8ohDuFoJzCie8x9DH0qzp0FqXNaJM0f05CDJqDVRnYQCkFlLQ2xiqnTNTS/IHtXUYE186CWm0VhT09uDI7Vy/dirPEpR1LVkmBj3qnSxmZ1lMBTDSXwTR1wYpF02QSQZ5iRyD3j1pylzy1RO6LdVrhKL6echftTQ3xFZrUatvT7VPTalzicckfL/s1XFqnxgbRY7odyN1ru2EApZft31yQY9q0mhirtZEZrQlh8+Pduyh2XlY1tU3c1VdOK9rHAcgVW4r5og3lKtUNzj/irN+DjJM+gjMiPt9q9b96ruXRR5XCFSXIbFPtCnkknMxEHAjmaVWLYYitVoNLgRVMEHmnHROiFhZzqemBz71q+kdLTw1PaMxzSbrmlmIxTWLj6dbNptu4Q93jYvcL6uePYSeds2fZ4nH/6H7qoib6ks651M6hjoNAqwfLfux5ZOCu7uc5P/AZt0D4d0+iEKPG1Eea4R5sn8Kj+FZ7D6mkWr0K2FFuydoGZHcjufXNRfXXbkK1wovfw/KxjtIzTovFoXHigMN/v3/4qXzNaPLb8z3+gHT9VpOp6ZrjHxTAUTcjhF52LHNwjv/CDjJkouq6AhTjadm8gcKXYJaQf+okn3o3Q9Z3fumVEVc8ksYzkk59aXdR6nuIPPiXFOP5UiP7Vtw69jm7mnCmfG13zWV8Hw7zg8Bts+xYrSXWXf3rAcsAfkwK4/wDrv+1OWNy8bzKhhgxVjhZDkgbjiqU+G2u3LjhoIYwDgHcryQfTzfkeapf4zGwEOPZRjwzeRVY5+ZCZ/C+o3boZVYBBbjMFdzfhPaLpUjgiR2rJde0ptX3ULsIM7ZBADAMApHaCIrV9K6Yum33edt0eSQf3YI4PMxJ+lKvirS3bl97jCC2T6D2HsOKyXSGWWSX8Ntr3I/r81aGshjii/FR/f+1n/wDEjXqAurk16u+Q09ESIbTxiK5ZuEYOKbNrIabYgkEEkTAIgwD3pPrEIYmZmhJa4UkvAIpNunAEzTK4BGTWf0OpIEUX+0TSNmcKV8J5Wo6Tp0fJPHamGrCbYAApF0fqCoPNUuo9SDABPqaW9hIopkFAZV1uw+7aeIB7HDCRx7URqenDacRj0rnw3klfWteemAoflS42PacJ4cKXzrQ2MEt9KnrtKNoYRPtz9aN1w8E+kE0q1Gp3CFrRiqQbgmN2lqb/AA1r/DvW5Ez5TmMHt/T9ZH1FNOrDjBEEHuDyD+vX1IPxjRkyD6V9Y+FupC7YGdzKYbEEfTv8xT46DtqOM4pBdR6Els/h8p/Cf7H3oMaJR8q1924rDawkHsf1P1pDrdDADWmLp/GOXQTzA/EI9PSpdTpOoXiwHKG0vSzckII9+0+lONB8PquW80jvxPem3TrCqi7SGBEhhEODkEEd6LPH65+XY+3egh8Mhb6nCz+i62NozSSf4UvhgEdjWLvWlLsOwJFfTAw4/Wa+VavUBbtwHs7D8zU+uiDNgjHOEMrRYT3S6NAMVd4Q7Uis9SAIWcnAAyZNPDZdENx1ZEGfNg8TwY7Z+VQTeGufQYM/BdfGERa6eGqyxokEwQSDBggwfQ+h/wCKT6X9p1RyTY0/ouLlwe5IkD7fKRTzYltBbQBVUQAOBTn+VpYdt2evb8+vyx8V58Oz73Pb69vbnvSFvOV4NKdT1G8ZBbFHax6T3bgrGi1EpuiaUE7qNBLrgJaTTLRqeR2Iz29v6UM4moJeKmKpbTj6lMCQUZqrBOR3pRf05FN7GonvUr9sEVx0oa6gm1YS7p/NabR6sgRWbtwrU30d8GiZO6N9jqnxNRnVdRMD2zjE/wB6Et60qIBruseAZrGv1iHInAMUyaB8ry8dU11jhaTVXye9QVTEigtNqgwmnnTNp/tQwQi9pSy4g5VWm07kE16xq0DhWEEdopqt5VEcVner3U8dYIk1ov0sQj3DlcMtcIr4g1ilCBjFIulXHZSAxpv1XSB7ZIMGPvSboaOkyK4a4KJ0o22OVDUawh9jnkbWiJgkTBIMHHNX9d1BTQjxDN0KEZhw23yqw7wVCnMGSaznxNdYXSR9KB1D3bqQxJAqhrAKN45/JGXF+0pP4teq89Ob0r1av2iPuiwmemuCq9ZBNUIYqk3TNQBlmwhDSco6xbAFcuGKmgkR9apZZrrWOu0JU11R4qxLueaD2kGveJmqmtaUewUtd8Oa3bcBJwa+kLrF28ivjmiuwKaWuvsogtxxQPZQO1KIPRaXr1pXY1mL2nAYx9qLTqlu4t5zcCFAuxGy9ws0ELH8oEk+4pU2rk0rSRvYDuXGBwRVgwa0Hwp1Bk1AtZKXZBUbcNBKsNwgHG3tO72ArMi5kGr7Osi4HmCG3D2IMinv9LgQmB2V9OuoCYBP0Z2P2twB9TVegcjUrbDsoKtt2wYcCYbJjE8jmq+h9QTUW1UlS4/ErbUB9DtWN49qb6JdlwAGWIIE+UH1UIBCjAyRNaTZAWfJe2W4Ed00t3yBBRvcrsKk9ztnE106kATDY/yn7fo1QrMT5ioP8q7m/OQB9qA+IdXsQDJ+v2rOnm8pheei0WM3GglnU+ukElcN+Uduay/VtCTcBDBkug3AwkAR+PcOxUn8xHNEPc3Me5PPf6UXZ6MtxEX9oGnt83SLc3WETh+FGRyD9e2P4bL5+o2ynnP/AD3TtdEBFbRkJGOqXLbmxoUHix57zBSQCYkscKvGBzPcinvw3N9Ct28L6KRJVWS2bhbeQNxJdFJ5MTKgCObNX0jTtbbT6JHt7nVr+qvSx2DcCqKx3MxgQAFXzzINH9O0aWbapbEBR9fck9yfWtDxDxGKJha0iulfqT+wUDYpY653df4A7e6aXAI9KCuLPeTUHuEz7VQ+qAFfPPl0849SkeXMKG1fcGlV213o0XwZxJPFcuWOIBnvUQIYaCWWb8r2k08iaq1el7RmYgevpRenJWjm6JduWmuki3bJ2OCdreG3kdg38BUmc/ykR2L9HA/UTBo46nsmiMEUEnt2UsibzKrTi2T547lgAdv1zU9Rr9FGL7+nlUHiZgsYP/IxWGsXbTJ5TOZDgyp4gEMJU47xzUrOntmfEXzdzPI7cV99B4FoqDSNx7k8/ksySWVgLq45xZH6haS7qtDM+JfP+qyv/wChTn4f0en1AZrQ1O1cF2Nlkn0G0yx9hXzzVdMsnhftP+9Oeg6u4lkojwiEYUACHMEnbGZjJ9fak+K+HabSw7mRA/M/RXeEuOpk2l3/AJ+hW06z0W8U2JdDAAttIAuAYlo/iHGQSKw3+BQ2a3HQtMCF8TfFtmNu5b/dspeN0FTnIHK+uaP670i3c/eWLil/40Yqpb/MsQA3tx8u+M6MPhD4DmstP8HqFVKHB5AyBwVlNF05VWKkGNvijbDx/tXbrq3IrKjnaTnlTuf3SPX6x2zxSC7dbfJJmtdc0wpTqemiZrrJgHG0tjhaJ0/VRsh8e9PuiWkuKSIIrMvoCFyKn0HUtZJAqnTuaT6l0BpKn13pKFyCKV29EFxRnxF1Rg26MVn7fWdzc0ySJxHo4RFjunCYXAgMV6l1zVAmvUAiKPyyl0TRVrpxPaqbKQRT7Q31j3rRyOETnEcJU+lKciqba1pvBDrmqr3SxyKCXUhuFwyjqs1rBj+9B2LZJxTPqSbTFU9NXzY57etUMtzbCcHClNEKrNCXmmn1xBtzSW+M0TLBymBopRtoSQBycCiFn60Mpp30bpxdhuBAIBEiJB4I9R70bzhCQAqk0N42Tf2N4QYIX7BiJj8x96Gk1u7/AE+4un2ywsM07Z8hcDmPXH5e1Ln+HntXNtwAEqGABnDcT74qdz0lwykXTddds3EuJ+JDKyJGQQQR6EEj619Z+G+uWtUpIBS4oU3UOf8A6GfMkg+h4BGc4tOk7jtVZPYAZxmgtMj27ivbkOplCOZFUwF1Igdq+lX9aFYgnjJGAFHq23C/ISx9awfxp8b2i22yjXGA27j5V3egH1yf+y4bq5u6V7l5QrLIV8GfVhbPl3AY3flzPz3oug/aNSMeVTOc4mYzyZ5J5JzzXtTpQYt8v3eU6LWh0nlxc9fh/aO0eo1LgMwPm/8AjBj5VsOkC9aEMxgwYMTHpRjhgBbT2AAFC3XFu54c77g/EBkIf857t/l+/afl5Jd+YxVdey3MRNuQrS3HVAFOY5+cf90AdSKrUEjNC37kHFZjnmSSyst8xcbKIbUDNB323VLZn8vnViWPQUNBqjlO5U6W2BRrHHFXaPpxcxVPxPdTTWykzdaNqgncRI3RGQds/ccc1Tp9JJqXekGup7LrGE+loyknW+tbWGn07Kb7eUsCCUJBJCxxABk+xpd8Q/EC2+nL0yxde7ee6A+CZts29wGAiJkRMgTUbPw2AzXNTcWwXUK1uxaH7QUkttb+GzOJ3EsQACABBa9Pt27Xl09pban8THz3WHbdcbP0XaM8V9LJqodNEI4sAD7vUnu4/wAJXpged/qPfsOwH7lYlemENAUkDsBjHY+1aKz8P6kJ4psMLZzIhoHuCZj5x862emdYiB7+lc0epuadv3RlJ/8AGTj/AEnt8qVovEHwvDicKyaeHUjYW0kPS+kh+Bn/ACNtcf6W70dc2ISCwuECIuWwl5D/ACsyRvQ+/pTfquntXLZvW0Nu4DBAwpxM+x+VZZbzZLkkn15+U980/Xavzx7oNw0rDtNFP9J1QLC03t3lccCsVoldjOYNaLR6oKM4qHRyvGHHCy2zEnKlrtKsmBFKNRpGjclG9R6iOV5pz0kAqAywY4IjmgZp4Z5jtKdh6w41TbtpEVbeIxTv4h6cgO4YNZnVagDy8mppdOGvLTyEksINJi1wbPas87+fFX2w3qflQ90QZNEOF0NNWiNZpfESvn3VLBtv9a256gBgGkXVdOLhJ9K0dHI8GncKiFxSW3fwM16otpSMV6tLy2qhO3UUHevFT5T9p+2acHTgmhb+jEg9u/f8u9RQSjqpRK26KYdF1ZOGrQs0rWV0ThWitAl7ywO/pnmpJxb7UcthyznWR5qCtHaZptq13GhruirQ0moAbRVkbsBcW9uqzUaYFQAsETLZkzEY4Ef3q3p1jsactosU9zheFSHdFkf2QzWm6KzCNxJgBRJmAOAJ4A9KpGl81NrFtdvH1+2P6/evP+7aW6TNK3U9Sxtkx2E4zziqOn3/ADfOl2vwZqgawiuMhDxa5uWhOoLsLdseZiFXMZJgZ+tJdd4tq4ycOpK49eOaos6wbhzP2gyYiDntnFGdPzcL3GgKd5nJJBkCO8mqoGUQ0dUMpDWFx6LnxXrtqppk5MKAOT649Zp78MdHaygEQ7SSTAgCJJJ7CRn3rPaXSE331RAJRgUJyAeFAHc949Frmp6/qNxD3N4J4cYHyAgY9OPaOfeOxSTPEYIDQOP9+a54C6KFm992eT/q9k+631W4jNY04K3AxS5eIhhBgi1OV7+fn0jmjPhzp4QAHnvSJ9cWJusZZsk1pOiE3NPZe2pLveNsnsFzk/ICvnNTppHxGOHAH6q0ymWTc5aRdKscUFqNMAaYOjr7jJ/0gxJ+Zn7UDdaa+Zkgm08m2TCc6qQyr7V5SPrVwYVXdRcEHM8e1e3E4KQ9vVG/t5tW4trvvvItp2xEux7IsifUlQJJAqGg6AbYa/fffqHyW/l7wvp9PzOaJ0zBcgAExLfxGJgE+gk44yfWodR1vpWq3xBv2TyWdP1Pf5dB8+1Ex2wGuT+3Ye/X8vfP9Q0Y3TVKaT7VO+zM2avR4FRF76ybKmDGusldCQcYH5fWrliYJEiqzeBMscf2FBkbiYwPemMeasoCWtOExv6lmGwNP9qDvaIwQR86ssCCMDHcTnPOaZsQUrU0gMgJJQPG7lI7D9hAj1oO/qxvG4bl7gGJ+vapdYVpkfl7UpEzmuPk/D2UzmUEwtXJ9qMXrF22Z3Fp9TPFBWxU7tkEUGne1r8GkUJd1Vus674ggiKCSxOaHu2oNMtN+Gl6h53EpjTZVdpBxVWv6fvXAz2NC3tWRcjtT7p18MIPNP09CgeqbVNXzLVsyOVbBFXJeGPTvWp+K+hhpuDkVk9PYzFbDAKz0RxGwpPoyTI47Vyt9odFa8NeOBXqL7Qn7Vj0vya7qOKH0yRGfXGcflFE6lfLWefSaCynM9SW+OATInBA9jyp5HcQecE4Jiup1E8VRdOYqy10u7eMWbTMYAhASJAAJJPEnOTGcQKtbG0gAqprWnBRWm1EnPf9TTcKMHmrNB8EXlhtRdtWBAw7Bn4BPlUxzPeibd/Q2boU3rt1l2lf3a27bEzI84YkCOI7137G9zqYF58ThnoEJowC27ACeZtwJXBwGAyQzQv+r0zULvUCQfckwMDPYDsPamms6Pa2rftrd8IMN6OQGKYkoYBIIDCSMc+tL9B0d777LI8xJgs4Cheytj8RJAB7nEenG743+W8ZXt1IHUa6OeaI/wAXTagUEHbDyZlpORjAiBHtSHXXG4JMAkgHsTAOOx8o+1DJqJIwBAjE5yTuMk5zGIEAYqySnMwvN9WU91N0mJ78fKSP6g1VXLeotm2JBLhXAyqgeZSsBVlmBNydx4KwRABjdvq2wqNsAK8sCS8sSyrgqkFRGcjnNOhpraXeq4mlZmEdz7+2T7Z/KnGjsOxIcNtGAN0ECZxII5JMRyZovpqgwQIx+jT6wimkukc19tNFE4BzaIws/rrg8JLSIV2mTJksYiSflPHqaRvYZ244rY9SVR2oXRaQE5FTP1TiTuOT1Q2GiglZ0TFIFfUvgvRGzobKN+I7nb/UzH8h/akWh0KzxWstERtB4AHyAAEiPlSNLqN0jm9lVCzqirQBPb1PpjAn/KsQPUgntNIuooobymQeDVfWerkDZaE/THoCexwIA4gRnuL07xmQrcUnzEi4NoKyACCSACcfxGe3FD4lpm6pgaORx/Ko2EhTmoC2ZqWv09xHyPLgBhlTj19f+aK0Vpm4BPyE18xLGY3+WW5Upu6QrXGFQBmmN3TjOVxzkED5kTHy5pR1C2bbEAgx6TH50L9JNGN0jC0HixSHcOhtRuWqHWw57URpL3rTiyVjFXaPRGW9xU7+cLNMhWZq7TXMH3ojqNxSDBzNUWLRIFIni2OLRleYy8qdxTzXDrduDU9Rbg0Dc1DI25QDHY5Fegkex1A0ieKV1+2WUPjaTA9ftSnUWQGqel1Mds/r7VXqb3c81othsWeSu4OFZborb5ZrPftpDj0702TWjbzXRpSwbiidFSGv1bp72KA1d+aH0l8+tJ8ovCSByudQU+ICKaaa6REUEW3NRCtFHuwAUJl9KN6jrwbZnmsHqtXDyPWtN1E4rP6nTyfatfT+ptlN09kWmul6yQg+VepUtuBFep/ltVGUy1el2klZ2ydpIg84mDgx86oYMRH6xWku6Ty/OgV0ZwP4R7ZzE/P6ms7BbfVRfFLOjdNtF2a6whQIQyNzH5ZIH54raXtRqVVLNi2LWJ2ov70iPxbZ/dp/mYp9az+h0yi5n1JB7+3HBrbaXRKbO0QUgkWidtq4/wDNe2jdcHscVXp3EusqyGdjfSR81kL9p2OXBBP4924GOSHP4o7soAHq1S0FuyryQD/mIycfl8vv6CXxLo9QhLStySu9gQMASdqGNqLwqj5ms2/UNkHluwGYnHzzxPvX0+hkZJGSTwszXuIeAzg/6lutcrahfDtkLD5JkKqZTzYEzMREmY71ZrOh2vDt2/FFmwLitduNh7rLlPkAQSq9onOal8J6QqsMQYJLEDm73EnkIJj5zzWouWbPgs15S6IwaBHYFc7iBHmPcR9KzJnRedjni+y1dPA7YHuGeiX9d+HdPcHjLpbd5/xXNyHc6xBI8yqH4Jn588YrrGs0GnueHa0thbgIAUWxfuywGP3mLbSf4iTHatpqNYLd0Tccq+weWd1trwVgpK/iJMujxhlcSQxA+X/FAtPcdyrLqBcIfaoQOFbaTcQH91eHlJK+VpJEUL2kDBr2Td7W2do+aO1XxNqFEJ5ZkEsRIIJBGxAqA47hhmkNy891y924Wb1YkngwB2AEARiJEDmCdOrAG2XbYWBcAyCyzBJ4J8zZ95pvo+lqSWVTtLHbugkLOJIABMRJApTQe/5qZ8pdz9P0Cp6ZqHAPfapIk9p4H3Jo/T9SYNmO3BBGQDyO+c1LX9NUKNoggZ5mcH5RyBHpmkpR1AcHExH+9A5hQE4W3tIrwZnAPyntmi0sKKR6HqrOSxRUn+FF2qPYD/mnanyBiYJ4WOVz5p9JBFfM+IRyB5PQIWs3IxLZCM/oP6kAfmaL/aTtx3Gf7VTo0a5adFAJI8s8SCCAfqKWdT1PgtbtX7qW3c+S3uUv3yQCYBiPc1MyOahLCDgZPstfRCMMLXHNo3w5/iI+XP3qnUKRgXWk4EuQfkDOPpXbIOADPuP1ijLust24AALfxN/Ye1LbM5zt0jj9VomOhTQs/p+l61bgZdQdu4F0IlSoMkNuA3e0TWn8G5qfIyFEViV2vKMpnym2AFgYHrjnmhBea6wCggH2Io/p+vBXwxAkuhHD4P4icwCJgRJAmtbT+JTvedh2gDkc+1/G1JNomOYdzd3v/vgvKiKoVAIXggR9Y7Uo13c+lMFft96Xa63WIZJpnmWUk56m1kyVtpuPZBPdkgICZjtmSewH2+tLtbfuLOYgwRwZ+X0pro9a9q4Db9V3CAZAYGM/Kg+q6a5cLO1vaLjFwSPc4U9x5u3tWhHTmbrPxxhRlu5CaC4zGSRHvzn0rWaG2IHas9a0Gy1bc3ELSy+GFAYAcM5BBPGJottdLLbQQTC+ZgMgeaSYAEg1o6WBn3jnsugPBRfUr+4hZELMRQTIO9DWCLnm3gEdjOfYECPvFF3iu0xzUOo0sj5C4J7XUMpG4AY5A55NI9VrZ5pxdsFsR357/KlXUOltuwMHIAzHtWhpCHYcuNcCbS7xu9WJfajdN0v1FE3Om+WYx69p9JqieZjBRTDK3hAre9apN3OKr1MjFT6doi0mkiMUXBCNoBKkNTBpnauAgUg6pZKsKv0+pKigfpiW7lO6OxhNtVtPNAaq4IxxVWp1W6hLt0xFW6NtR0VRCKbSofVZ5r1K7rZNeqzanL7u/TrLrvtBjP4QCNsjLAAy08mJ4GJBx2z0pCKB0rXbHnEtawTt8wZQcEgGQPcwQfQ05t9TS+rbFZboA8rvJJJBA82cg4mPrSY443ZLaPb+QpKB5SC/0hQ8R3+tMrOjCgw2IwCfYx2P2pN1LqDLdghgQDuG1hDAiQZEdxx6jvy4019nQAA5jsfWPpnH1oBGAThAQLylzaIXt9vcwDKwWD5piPLIgkntWZ+HvhRzq4u2XCIFKlmBJcsIJ2kiAoaROMc1q0CrvDz4ggWtknJ91xOO/v3iBdP1LU3C9xGJt2n2h1JO9iIOD+ITMY4in+FwSlxY2qOT8OmfiuOnigj3PbftynGu1CLdXS2CguCCykxAeT25bvHOaOttutMjgMrKQynE7hBEd8H86xPwEz3dXcuP/MXYkcnMZ7nzH9RW36rqTbXxO5IUFeV3MBvKnBCjt6kA0jWacMn2RnPX6ra0uo3Q+ZJx/sLP9aJ8UqqKS1q0PNJVmtM99AUA2wN3fbGIxzmdf0w6rV+JItLcXeLtwAKTatK96dqiCGJHzI9MbFHttsi0GdmYEgFgEB81zdvUlW2kAOZB2bREUq6zZski6tsXGugiPEPlJAlSqCS+8loJmW7irg2m5NqB79xLlltPZuiFk+QjaDggnzYU95HPsKbabXw7KUFuDGwEkKww2WJPIJOeTUn05yWlQx2sEQYhh5SCwMwCc8lfmRBfChwbYwu2wR5GPnkPcAkMxWR6fkaU2+6ReUZc1RIYJ/EpU/LBP9KRXtGZP6/7p5p+nsFlgYxmDEsAwn0wfrFHN07bt4YsoeFyQD2McH/evZ5K9RKVnU3CqywIjcRAwT5e4mYznj7Uw0KM/H1rlm3bWWuwEAOSdoBMQZ78cUp6h1Y6kDT6S07gg/h3KzAA58o7GOSB6+2VrA3UHYz5noP7+CpgiechOdV8YDTnwrFtr1yOwJH2GSPtVXxo+ntKiOqv1K8tp7zx/wCJBEKIxPkKrMn8RntS7QfCPU9vh+GthNoD3r1xDcb1M2yYiYCgY9Sc0ZqPgptzP45vXXg3Lt0mWIEY5IUDAHoKZNPDoovLFDoLNuPcnoPkmaWNvmAyH36D2HU+6pTqd0rgiCM+v1NPPh7TbiC43HsKD6Z8KOp/eXVjuFBP5mIrUaKwlpYT6k8mvl9RPGPSzPstmXWRhtNT7SogAwAR2GfzoDqoSSwA3EQWAEx6TzFDHURQmovzRS+IOmi8rbXssl8hybXNHbk81bqNJ3odb6pkmp3up24EGT3rf0kcIgDXVagLhSCGjjdKggxJjIzOPSreoawsFUvKrhZ5jHf6CqW6gMz9PnSXXaiSAQxB7IJb6UssbtLWHlCH1widXeUTkYPqD/TFL9R1DxNoZgQg2rxIUcLge/egNDoXuNmYng/0p4OgKPMBRMcyAVaeLdwuaHGY5o6/cWMDJ9qpsWmBiKlqbcUs6zNBccCg7YE5olVSaUXySZFUNqHGBVMBzwkgWUw1VxQZx+X9KHZgRSdrjTLGfbM/P0opb2K5rYdwBC8Y6yoXrQoqxtAigX3EkSD7iYPvkA/cVHwzTGeltIg20v61cBafSgVM0brdEWOKKsdLgU8ytDMruAErC1C7xTPU6WKEupimaattom90guJk16mT2M16qLTNy+mdK1ty23kYqu5ZZhKCSBubOMTxBwM1qF6fZa+XtujOdpuQQynG1pGSokcCRuCfKsuxEBWtsdrSzAz5GOEcCIOOJEGiNEvh3AVuKhlm3OYTaJEGOW7gTn2NTwy7AGuyP2SAawtB1jp3jKskhrZJkAKTbwSD6nyoeQO+OBTo7K21A3ZgOVHHsZ479uPzp9odSlzcnib2UDzSocc5xABHqB/vS3qHwzbZ1e2WtZm4gwrLIkY/Cx9sc471c5t+pqc5l5CQ/FDsbV26DJCnzRHAwxj0I/r6VmrbC1YCywA7qJI5yMiTljzTf443WLV2PwPKqJnDYIkQMicETAHoZy/VFu3LQRGCwgdyzbQTB8o/mYTwM4Poa1PChtZI4jNrA8UYXSxtvva1H/8AOknTm6EI8QkAmW3bJUkY4wcZ4om6/iXgbm4AsqqpnaVlSFZlnzEMTGCDHeAR/hLTmzo7SjIK7m4ES7kmfUmB7bQf/a/WXQLYtbYMq2JCAEBSZyTkAyfrnFYM0J850jubK+icR5LI28AD9lSb1rfcEtcQMPDlQwKjvcOCQCFgGMYMVfrOnm6LbgW/DAYB9x7LMGRvYjaM5/DGM1bqtNayfDbCKtlfKN8gkuVAnbkcSZ59p/4eyMtl0Z22lkX8QJYHaNu7agJ5j0+tNzwUkNpCXdNsslRaR2I3OxQ7raMJSLm6MqohRMZoHXtcuSzySxG9gMOy7gpEACAoiPmfWNVplsbGt3rshLpYTuHibf4WkRzOPalmusPJTCDLhQYUDLCMCYDEAn3iuuBrC85uFQbDWrJBktdQErwFUHcGmfM0R2xupTZuXVJ8NXYkRtTk98k4UY/ESAKaWtV4QuLtkuoUNuPlU5IAIyOB9KITT7U3bgT3A4mAYxyag1cj9tMFrwGQlWl+GTeIfVPuj8NpP/Enyn8Zj+Juf5Ritbo9IttdqAKPQYn5+v1oLpmqP8Kbjnj5H/ui7Q8TAO2ATJPJjj2rAdpZpq3n4ADA+irdqjt2DA7f7lWXWWYnNU31IwaCv6a6WkyT6n7d6ObTHiZoovDGOBppFKV0rihluZohTiqkTZIJO1hmACZGVGeM11XxSJtCGiuqJjl1jVRsk1eF/XajbSrtzzXIdBZzhETaR6rTEigG02K0V+KFOnmtFkBpTyNSFbMmCY96qsb1YMpgiYxPMeo/UU2v6YgyKGawfSgstwBlKAU+k2hOeeT9a0BtiKzlkkH/AJj+tNdLqZGT9KfA1rgdyeyUgUrP2fM0B1SAppjc1AFJ9Xc3n2qQgCSgmucKSuzYY/Ln2r1/Tx2p3YtgcULr4kVpMyLSQKSK7oCx47T9Kst9NxTezY71fcCgHA/X1ofNsUju1nnsAVQ1uml+3NRGnoRJXKVwl1vTZq9lFXXEiohKAuLilmyEq6oMUlg1o9Tb3GKW6vRFTWhC+hSbFdIUWfavUws24Ar1N3hMWjs3CMTjgggH8Mkc+5PHrUrtwQe5PcTIAxtiYiApqFpfIzdwyD6Mt2f/AMj865cfeMwNiqo2iJBbJb1OeakjstygDFpPhFwLlwKd21AFI8vlkbsHkTH2xWitXokNJAaRPvxE57/rNZX4Tc+KO0h1MdwBuz9T+QrTaq3L2xJE7uMHyz3/ACrV059ATWcLP/E1ssGcWvFNvzohmC52qhOPPtLb4MztA9K+W2Gvuz2bocsjXCwUbibgJgELgAMSJHrivv6WFEAARAEdoj/gULqEVDvCgknv86vg1DohQSJ9KJaJKzGkZbVu0lxCDbtp7MW5YAj0J5Ed84wbY6ZZv7vDusCZUi4AwIY7jnnlZyeRTvW2EJVioJVWjnsGIn5Zj5mlHUEW2q7FUESd0eYktyW5PNSSAklzshUhoaKVulstYuI151IjYCVIYyvmO4A7gCp5JkHntReodjfBIAAU+bHmERtIBwAYwe9L9fq3spYCtIfncA0QVgiRg8596MtXSXdZwBHucTk/39hQ7h91eSNVdgyoNyu34cFsbtpjkQAft8q89m87iZmNkvmCFkrLDmM/Wi//AB3bwTG1SynkiCojPYhzM+grj3TsV+CrswH8M7lMx3pLeM9FzagtF00XHZXldqljODyOx7RNWNoBdbaihUTcWKnfg5EYk8ROaO1beJbF8gBySDHED27c0I1wozKpgGJ9fLBGeRn0r21owV6qXOn3zauoFQsoJAxsYlsEM0dvrRN/UhbjBwA0iAsgDjsc5EVxh5Fuyd6ksDJOSWJJBxNJ9RdNx2djJJn0pU1BtfkuELS27455q03BWcTUMLYz3/3o6xcJjNKfqNjeFylZqzPahVNGeIRPuM0uunNYWokLnbkVJjaZQJ7+navNqBkk/L50CrcVIjNGJnBeXbjtj7/Q1dYu+tcmQB7xVV9YJA7Ej7GmiUtdbeEDgib6gEAkZE1DwhS8GirLmm/aATkIA21VqNLQ1pIpxbSTmg765NKkH4gultIZwTXBp6JSpEYNcjYHGyvVaG4FAu0z88Tz3+lHXjg/ruP96BcVUTtwu0rFuetV3LnapASKrjNTgi7XEy6h0nw7S3C2SRiPWl1tKK1LkqoJJAGJNQXj9D+lFMWk20UvVlL7qZivNZgTRLDIqGq4oAV0NSu2p3VV1LFNDaAWe9JdSJmr2mgvNKu07JtE12hUMCvUe1Mtf//Z",
//         description: "Salmon are here I guess..."
//     },
    
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New campground:");
//             console.log(campground);
//         }
//     });



app.get("/", function(req, res){
    //res.send("this will be the landing page Soon!");
    res.render("landing");
});
//Index Route
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground/index", {campgrounds:allCampgrounds})
        }
        
        
    })
    // res.render("campgrounds", {campgrounds:campgrounds});
    
});
//Create Route
app.post("/campgrounds", function(req, res){
    //res.send("YOu hit the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground ={name: name, image: image, description: description};
    
    //create a new campground ansd save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/campgrounds");
        }
        
    })
    //campgrounds.push(newCampground);
});
//get data

//add to campgrounds
//redirectback to campgrounds page


//NEW- show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("campground/new.ejs"); 
});




//SHOW        shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            res.render("campground/show", {campground: foundCampground});
        }
    });

   
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
    
});

// ++++++++++++++++++++++++++++++++++++++++=
// Commebts Routes
// ++++++++++++++++++++++++++++++++++++++++=

app.get("/campgrounds/:id/comments/new", function(req, res){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                console.log(err)
            }else{
                res.render("comments/new", {campground: campground});
                
            }
            
        })
    
    
    
});

app.post("/campgrounds/:id/comments", function(req,res){
   //lookup campground with id
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err)
           res.redirect("/campground");
       }else{
           console.log(req.body.comment)
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
               
               
           })
       }
   }
   //create new comment
   //connect new comment ot campground
   
   //redirect to campground show page
   
   
    
)});
